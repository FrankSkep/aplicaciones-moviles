import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

async function getExpoPushTokenAsync() {
  if (!Device.isDevice) {
    throw new Error("Las push remotas requieren un dispositivo físico.");
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  if (!projectId) {
    throw new Error("No se encontró projectId de EAS en la configuración.");
  }

  const token = await Notifications.getExpoPushTokenAsync({ projectId });
  return token.data;
}

async function sendRemotePushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Push remota de prueba",
    body: "Esta push fue enviada usando EAS projectId + Expo Push API.",
    data: { source: "test-remote" },
  };

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar la push remota.");
  }
}

export default function App() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync().then(setPermissionGranted);

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!permissionGranted || expoPushToken) {
      return;
    }

    getExpoPushTokenAsync()
      .then(setExpoPushToken)
      .catch((error) => {
        Alert.alert("Token no disponible", String(error));
      });
  }, [permissionGranted, expoPushToken]);

  const handleTestNotification = async () => {
    if (!permissionGranted) {
      const granted = await registerForPushNotificationsAsync();
      setPermissionGranted(granted);

      if (!granted) {
        Alert.alert(
          "Permiso requerido",
          "Debes permitir notificaciones para recibir la prueba.",
        );
        return;
      }
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificación de prueba",
        body: "¡Funciona! Esta notificación viene de expo-notifications.",
      },
      trigger: {
        seconds: 1,
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      },
    });
  };

  const handleRemoteTestNotification = async () => {
    try {
      if (!permissionGranted) {
        const granted = await registerForPushNotificationsAsync();
        setPermissionGranted(granted);

        if (!granted) {
          Alert.alert(
            "Permiso requerido",
            "Debes permitir notificaciones para enviar la prueba remota.",
          );
          return;
        }
      }

      const token = expoPushToken || (await getExpoPushTokenAsync());
      if (!expoPushToken) {
        setExpoPushToken(token);
      }

      await sendRemotePushNotification(token);
      Alert.alert("Enviado", "Se envió la notificación push remota de prueba.");
    } catch (error) {
      Alert.alert("Error", String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba de notificaciones</Text>
      <Text style={styles.subtitle}>
        Toca un botón para enviar prueba local o remota.
      </Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => void handleTestNotification()}
      >
        <Text style={styles.buttonText}>Enviar notificación de prueba</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => void handleRemoteTestNotification()}
      >
        <Text style={styles.buttonText}>Enviar push remota (EAS)</Text>
      </Pressable>

      <Text style={styles.status}>
        Permiso: {permissionGranted ? "Concedido" : "No concedido"}
      </Text>

      <Text style={styles.tokenText} numberOfLines={2}>
        Token: {expoPushToken ? expoPushToken : "No disponible"}
      </Text>

      {notification && (
        <Text style={styles.lastNotification}>
          Última notificación: {notification.request.content.title}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#28044d",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#575757",
    textAlign: "center",
    maxWidth: 340,
  },
  button: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#6d28d9",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  status: {
    fontSize: 13,
    color: "#575757",
  },
  tokenText: {
    fontSize: 12,
    color: "#575757",
    textAlign: "center",
    maxWidth: 340,
  },
  lastNotification: {
    fontSize: 13,
    color: "#28044d",
    textAlign: "center",
  },
});
