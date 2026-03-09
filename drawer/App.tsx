/**
 * ============================================================
 * ESTADO GLOBAL — CADA VISTA USA UNA SOLUCIÓN DISTINTA
 * ============================================================
 *  Home      → Redux Toolkit  (contador)
 *  Profile   → Zustand        (usuario + contador propio)
 *  Settings  → Context API    (tema claro/oscuro)
 * ============================================================
 */

import {
  DefaultTheme,
  DrawerActions,
  LinkingOptions,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

// Context API — envuelve Settings
import { AppProvider } from "./src/state/context/AppProvider";
// Redux Toolkit — envuelve Home
import { Provider } from "react-redux";
import { store } from "./src/state/redux/store";
// Zustand — sin Provider, Profile lo usa directamente
import * as ExpoLinking from "expo-linking";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/views/Home";
import { AntDesign } from "@expo/vector-icons";
import Profile from "./src/views/Profile";
import Settings from "./src/views/Settings";
import Details from "./src/views/Details";
import Camara from "./src/views/Camara";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import { useState } from "react";
import GeolocalizacionView from "./src/views/GeolocalizacionView";

export type HomeTabsParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Camera: undefined;
  Details: { from?: string } | undefined;
  Geolocalizacion: undefined;
};

export type MainStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabsParamList> | undefined;
};

export type RootDrawerParamList = {
  Inicio: NavigatorScreenParams<MainStackParamList> | undefined;
};

const Tab = createBottomTabNavigator<HomeTabsParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function HomeTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0f766e",
        tabBarInactiveTintColor: "#64748b",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Configuración",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          title: "Detalles",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="edit" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Camera"
        component={Camara}
        options={{
          title: "Cámara",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Geolocalizacion"
        component={GeolocalizacionView}
        options={{
          title: "Geolocalización",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="environment" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabsNavigator}
        options={({ navigation }) => ({
          title: "Mi App",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginRight: 12 }}
            >
              <AntDesign name="bars" size={24} color="#0f766e" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const linking: LinkingOptions<RootDrawerParamList> = {
  prefixes: [ExpoLinking.createURL("/"), "myapp://"],
  config: {
    screens: {
      Inicio: {
        screens: {
          HomeTabs: {
            screens: {
              Home: "home",
              Profile: "profile",
              Settings: "settings",
              Camera: "camera",
              Details: "details/:from?",
              Geolocalizacion: "geolocalizacion",
            },
          },
        },
      },
    },
  },
};

console.log(ExpoLinking.createURL("profile"));

export default function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <NavigationContainer
        linking={linking}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: "#f8f8f8",
          },
        }}
      >
        <Drawer.Navigator
          initialRouteName="Inicio"
          drawerContent={(props: any) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: "#0f766e",
          }}
        >
          <Drawer.Screen
            name="Inicio"
            component={MainStackNavigator}
            options={{ title: "Navegación Principal" }}
          />
        </Drawer.Navigator>
        </NavigationContainer>
      </AppProvider>
    </Provider>
  );
  // );
}
