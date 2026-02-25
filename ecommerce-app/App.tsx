import {
  DefaultTheme,
  DrawerActions,
  LinkingOptions,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import * as ExpoLinking from "expo-linking";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";

import Home from "./src/views/Home";
import Profile from "./src/views/Profile";
import Settings from "./src/views/Settings";
import ProductDetails from "./src/views/ProductDetails";
import Cart from "./src/views/Cart";
import Checkout from "./src/views/Checkout";
import Login from "./src/views/Login";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import { CartProvider, useCart } from "./src/context/CartContext";

// ─── Type declarations ────────────────────────────────────────────────────────

export type HomeTabsParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type MainStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabsParamList> | undefined;
  ProductDetails: { productId: number };
  Cart: undefined;
  Checkout: undefined;
  Login: undefined;
};

export type RootDrawerParamList = {
  Inicio: NavigatorScreenParams<MainStackParamList> | undefined;
};

// ─── Navigators ───────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator<HomeTabsParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function HomeTabsNavigator() {
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0f766e",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: { borderTopColor: "#e2e8f0", paddingTop: 4 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Tienda",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Mi Cuenta",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainStackNavigator() {
  const { totalItems } = useCart();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#0f766e",
        headerTitleStyle: { fontWeight: "700", color: "#1e293b" },
      }}
    >
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabsNavigator}
        options={({ navigation }) => ({
          title: "TechShop",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginRight: 12 }}
            >
              <AntDesign name="bars" size={24} color="#0f766e" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              style={{ marginLeft: 8, position: "relative" }}
            >
              <AntDesign name="shoppingcart" size={26} color="#0f766e" />
              {totalItems > 0 && (
                <View style={{ position: "absolute", top: -6, right: -8, backgroundColor: "#ef4444", borderRadius: 10, minWidth: 18, height: 18, alignItems: "center", justifyContent: "center", paddingHorizontal: 3 }}>
                  <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>{totalItems}</Text>
                </View>
              )}
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          title: "Detalles",
          headerBackTitle: "Atrás",
        }}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ title: "Mi Carrito" }}
      />

      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ title: "Finalizar Compra" }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// ─── Deep linking config ──────────────────────────────────────────────────────

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
            },
          },
          ProductDetails: "product/:productId",
          Cart: "cart",
          Checkout: "checkout",
          Login: "login",
        },
      },
    },
  },
};

// ─── Root ─────────────────────────────────────────────────────────────────────

function AppNavigator() {
  return (
    <NavigationContainer
      linking={linking}
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#f1f5f9" },
      }}
    >
      <Drawer.Navigator
        initialRouteName="Inicio"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#0f766e",
          drawerInactiveTintColor: "#64748b",
          drawerStyle: { width: 300 },
        }}
      >
        <Drawer.Screen
          name="Inicio"
          component={MainStackNavigator}
          options={{ title: "TechShop" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}
