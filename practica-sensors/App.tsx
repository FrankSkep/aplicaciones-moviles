import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Accelerometer } from "expo-sensors";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CondBadge } from "./src/components/CondBadge";
import { InfoRow } from "./src/components/InfoRow";
import { CaptureInfo } from "./src/types/index";
import {
  calcInclination,
  isNorth,
  NORTH_TOLERANCE,
  TILT_MAX,
  TILT_MIN,
} from "./src/utils/helpers";

export default function App() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [locationGranted, setLocationGranted] = useState(false);
  const [mediaGranted, setMediaGranted] = useState(false);

  const [accel, setAccel] = useState({ x: 0, y: 0, z: 1 });
  const [heading, setHeading] = useState(0);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [captureInfo, setCaptureInfo] = useState<CaptureInfo | null>(null);
  const [saved, setSaved] = useState(false);

  const cameraRef = useRef<CameraView>(null);
  const capturingRef = useRef(false);
  const conditionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // valores calculados en tiempo real
  const inclination = calcInclination(accel.x, accel.y, accel.z);
  const tiltOk = inclination >= TILT_MIN && inclination <= TILT_MAX;
  const northOk = isNorth(heading);
  const conditionsMet = tiltOk && northOk;

  // permisos de ubicación y galería
  useEffect(() => {
    (async () => {
      const { status: locStatus } =
        await Location.requestForegroundPermissionsAsync();
      setLocationGranted(locStatus === "granted");

      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync(true);
      setMediaGranted(mediaStatus === "granted");
    })();
  }, []);

  // Geolocalización continua
  useEffect(() => {
    if (!locationGranted) return;
    let sub: Location.LocationSubscription | null = null;
    (async () => {
      sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (loc) =>
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          }),
      );
    })();
    return () => {
      sub?.remove();
    };
  }, [locationGranted]);

  // Acelerómetro
  useEffect(() => {
    Accelerometer.setUpdateInterval(200);
    const sub = Accelerometer.addListener(setAccel);
    return () => sub.remove();
  }, []);

  // Brújula
  useEffect(() => {
    if (!locationGranted) return;
    let sub: Location.LocationSubscription | null = null;
    (async () => {
      sub = await Location.watchHeadingAsync((obj) => {
        setHeading(obj.magHeading);
      });
    })();
    return () => {
      sub?.remove();
    };
  }, [locationGranted]);

  // Captura automática
  const takePhotoAuto = useCallback(async () => {
    if (capturingRef.current || captureInfo) return;
    capturingRef.current = true;
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.85,
      });
      if (photo?.uri) {
        setCaptureInfo({
          uri: photo.uri,
          date: new Date().toLocaleString("es-MX", { hour12: false }),
          latitude: location?.latitude ?? null,
          longitude: location?.longitude ?? null,
          heading: Math.round(heading),
          inclination: Math.round(inclination),
        });
        setSaved(false);
      }
    } finally {
      capturingRef.current = false;
    }
  }, [captureInfo, heading, inclination, location]);

  useEffect(() => {
    if (conditionsMet && !captureInfo && !capturingRef.current) {
      if (!conditionTimerRef.current) {
        // Esperar 800 ms con condiciones sostenidas antes de capturar
        conditionTimerRef.current = setTimeout(() => {
          takePhotoAuto();
          conditionTimerRef.current = null;
        }, 800);
      }
    } else {
      if (conditionTimerRef.current) {
        clearTimeout(conditionTimerRef.current);
        conditionTimerRef.current = null;
      }
    }
  }, [conditionsMet, captureInfo, takePhotoAuto]);

  // Guardar en galería
  const saveToGallery = async () => {
    if (!captureInfo) return;
    if (!mediaGranted) {
      Alert.alert(
        "Permiso denegado",
        "No se tiene permiso para acceder a la galería.",
      );
      return;
    }
    try {
      await MediaLibrary.saveToLibraryAsync(captureInfo.uri);
      setSaved(true);
      Alert.alert("¡Guardada!", "La foto se guardó en la galería.");
    } catch {
      Alert.alert("Error", "No se pudo guardar la foto.");
    }
  };

  const retake = () => {
    setCaptureInfo(null);
    setSaved(false);
  };

  // Pantalla: solicitar permiso de cámara
  if (!cameraPermission) {
    return (
      <View style={styles.center}>
        <Text>Cargando permisos...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permText}>
          Se necesita permiso de cámara para continuar.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={requestCameraPermission}>
          <Text style={styles.btnText}>Conceder permiso de cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Pantalla: resultado de la captura
  if (captureInfo) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image
          source={{ uri: captureInfo.uri }}
          style={styles.capturedPhoto}
          resizeMode="cover"
        />
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>Captura automática</Text>
          <InfoRow label="Fecha / Hora" value={captureInfo.date} />
          <InfoRow
            label="Latitud"
            value={
              captureInfo.latitude !== null
                ? captureInfo.latitude.toFixed(6)
                : "N/A"
            }
          />
          <InfoRow
            label="Longitud"
            value={
              captureInfo.longitude !== null
                ? captureInfo.longitude.toFixed(6)
                : "N/A"
            }
          />
          <InfoRow
            label="Orientación"
            value={`${captureInfo.heading}° (≈ Norte)`}
          />
          <InfoRow label="Inclinación" value={`${captureInfo.inclination}°`} />
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.btn, saved && styles.btnDisabled]}
              onPress={saveToGallery}
              disabled={saved}
            >
              <Text style={styles.btnText}>
                {saved ? "Guardada" : "Guardar en galería"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={retake}
            >
              <Text style={styles.btnText}>Volver a monitorear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Pantalla: monitoreo activo
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView style={styles.camera} facing="back" ref={cameraRef} />
      <View style={styles.overlay}>
        <Text style={styles.overlayTitle}>Monitoreo de condiciones</Text>

        <View style={styles.condRow}>
          <CondBadge
            ok={tiltOk}
            label={`Inclinación: ${inclination.toFixed(1)}°`}
            info={`Rango: ${TILT_MIN}°–${TILT_MAX}°`}
          />
          <CondBadge
            ok={northOk}
            label={`Orientación: ${heading.toFixed(0)}°`}
            info={`Norte ±${NORTH_TOLERANCE}°`}
          />
        </View>

        <View style={styles.condRow}>
          <CondBadge
            ok={!!location}
            label="GPS"
            info={
              location
                ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                : "Obteniendo ubicación..."
            }
          />
          <View
            style={[
              styles.badge,
              conditionsMet ? styles.badgeActive : styles.badgeInactive,
              { flex: 1, marginHorizontal: 4 },
            ]}
          >
            <Text style={styles.badgeLabel}>
              {conditionsMet ? "Capturando..." : "Esperando condiciones"}
            </Text>
            <Text style={styles.badgeInfo}>
              {conditionsMet
                ? "Mantén el dispositivo estable"
                : "Inclinación + Norte"}
            </Text>
          </View>
        </View>

        <Text style={styles.hint}>
          La foto se tomará automáticamente cuando la inclinación esté entre{" "}
          {TILT_MIN}°–
          {TILT_MAX}° y el dispositivo apunte al norte (±{NORTH_TOLERANCE}°).
        </Text>
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  camera: { flex: 1 },
  permText: { textAlign: "center", marginBottom: 16, fontSize: 16 },

  // Overlay de monitoreo
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 16,
    paddingBottom: 32,
  },
  overlayTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  condRow: { flexDirection: "row", marginBottom: 8 },
  badge: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  badgeActive: { backgroundColor: "#d97706" },
  badgeInactive: { backgroundColor: "#475569" },
  badgeLabel: { color: "#fff", fontWeight: "600", fontSize: 12 },
  badgeInfo: {
    color: "#e2e8f0",
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
  },
  hint: { color: "#94a3b8", fontSize: 11, textAlign: "center", marginTop: 4 },

  // Pantalla de resultado
  capturedPhoto: { flex: 1 },
  infoPanel: {
    backgroundColor: "#1e293b",
    padding: 20,
    paddingBottom: 32,
  },
  infoTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 14,
  },
  actions: { flexDirection: "row", marginTop: 16, gap: 10 },

  // Botones
  btn: {
    flex: 1,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnSecondary: { backgroundColor: "#475569" },
  btnDisabled: { backgroundColor: "#374151", opacity: 0.6 },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
