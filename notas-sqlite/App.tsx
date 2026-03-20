import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import { TouchableOpacity } from "react-native";
import Home from "./src/views/Home";
import Notas from "./src/views/Notas";
import Usuarios from "./src/views/Usuarios";


import { initDatabase } from "./db/initDatabase";


import * as ExpoLinking from 'expo-linking';
import { LinkingOptions } from "@react-navigation/native";
import { useEffect } from "react";

// Deep Linking Configuration
const linking: LinkingOptions<RootDrawerParamList> = {
  prefixes: [ExpoLinking.createURL('/'), 'myapp://'],
  config: {
    screens: {
      Inicio: {
        screens: {
          HomeTabs: {
            screens: {
              Home: 'home',
              Usuarios: 'usuarios',
              Notas: 'notas',
            },
          },
        },
      },
    },
  },
};


export type HomeTabsParamList = {
  Home: undefined;
  Usuarios: undefined;
  Notas: { usuario?: any } | undefined;
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
        tabBarActiveTintColor: "#9000d8",
        tabBarInactiveTintColor: "#6b5176",
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{
        title: "Home",
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        ),
      }}
      />
      <Tab.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          title: "Usuarios",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notas"
        component={Notas}
        options={{
          title: "Notas",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event-note" size={size} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}


function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }: any) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#480082",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 16 }}
          >
            <MaterialIcons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabsNavigator}
        options={{ title: " NOTES APP" }}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  useEffect(() => {
    void initDatabase();
  }, []);

  return (
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
          drawerActiveTintColor: "#380f76",
        }}
      >
        <Drawer.Screen
          name="Inicio"
          component={MainStackNavigator}
          options={{ title: "Navegación Principal" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}