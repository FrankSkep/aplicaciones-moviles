import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import * as Location from 'expo-location';

interface LocationCords {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
}

export default function GeolocalizacionView() {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [locationNow, setLocationNow] = useState<Location.LocationObject | null>(null);
    const [subscripcion, setSubscripcion] = useState<Location.LocationSubscription | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permiso de ubicación denegado");
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            });
            setLocation(location);
            Alert.alert("Ubicación obtenida", location.coords.latitude + ", " + location.coords.longitude);
            
            const address = await Location.reverseGeocodeAsync(location.coords);

            if (address.length > 0) {
                const addr = address[0];
                const formattedAddress = `${addr.street}, ${addr.city}, ${addr.region}, ${addr.country}`;
                setAddress(formattedAddress);
                Alert.alert("Dirección obtenida", formattedAddress);
            } else {
                setAddress("No se pudo obtener la dirección");
                Alert.alert("Error", "No se pudo obtener la dirección");
            }
        })();
    }, []);

    useEffect(() => {
        return () => {
            subscripcion?.remove();
        };
    }, [subscripcion, locationNow]);


    const startTracking = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permiso de ubicación denegado");
            return;
        }

        const sub = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Highest,
                timeInterval: 1000, // Actualizar cada segundo
                distanceInterval: 10,
            },
            (newLocation) => {
                setLocation(newLocation);
                setLocationNow(newLocation);
            }
        );

        setSubscripcion(sub);
    };

    const stopTracking = () => {
        subscripcion?.remove();
        setLocationNow(null);
        setSubscripcion(null);
    }

    

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Geolocalización</Text>

            <Text>Latitud: {location?.coords.latitude}</Text>
            <Text>Longitud: {location?.coords.longitude}</Text>
            <Text>Ubicación actual: {locationNow?.coords.latitude}, {locationNow?.coords.longitude}</Text>
            <Button title={subscripcion ? "Detener seguimiento" : "Iniciar seguimiento"} onPress={subscripcion ? stopTracking : startTracking} />
            <Text>Dirección: {address}</Text>
            {errorMsg && <Text>Error: {errorMsg}</Text>}
        </View>
    )
}