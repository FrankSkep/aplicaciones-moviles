import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/views/Home";
import { AntDesign } from "@expo/vector-icons";
import Profile from "./src/views/Profile";
import Settings from "./src/views/Settings";
import Details from "./src/views/Details";
import CustomDrawerContent from "./src/components/CustomDrawerContent";


export type HomeTabsParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
    Details: { from?: string } | undefined;
};

export type MainStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabsParamList> | undefined;
};


export type RootDrawerParamList = {
  Inicio: NavigatorScreenParams<MainStackParamList> | undefined;
};


const Tab= createBottomTabNavigator<HomeTabsParamList>();
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
            <Tab.Screen name="Home" component={Home} options={{ 
              title: "Inicio",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
              }} 
              />

              <Tab.Screen name="Profile" component={Profile} options={{ 
              title: "Perfil",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="user" size={size} color={color} />
              ),
              }} 
              />

              <Tab.Screen name="Settings" component={Settings} options={{ 
              title: "Configuración",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="setting" size={size} color={color} />
              ),
              }} 
              />

              <Tab.Screen name="Details" component={Details} options={{ 
              title: "Detalles",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="edit" size={size} color={color} />
              ),
              }} 
              />

        </Tab.Navigator>
    );
}


function MainStackNavigator() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="HomeTabs" component={HomeTabsNavigator}/>
        </Stack.Navigator>
    );
}


export default function App() {
    return (
      <NavigationContainer theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "#f8f8f8",
        },
      }}>
        <Drawer.Navigator 
        initialRouteName="Inicio"
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}
         screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#0f766e",
        }}>
          <Drawer.Screen 
          name="Inicio" 
          component={MainStackNavigator}
          options={{title: "Navegación Principal"}}
          />
         </Drawer.Navigator>
      </NavigationContainer>
    );
}