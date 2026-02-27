# Gear Shop — App de Comercio Electronico con React Native

Aplicacion de e-commerce desarrollada en Expo + React Native con TypeScript, que demuestra la integracion de Stack Navigator, Bottom Tabs y Drawer Navigator junto con un carrito de compras funcional.

---

## Pantallas

| Pantalla | Descripcion |
|---|---|
| **Home** | Lista de productos con busqueda y filtro por categoria |
| **ProductDetails** | Detalle del producto con header dinamico, favoritos y compartir |
| **Cart** | Resumen del carrito con gestion de cantidades |
| **Checkout** | Formulario de envio y pago |
| **Profile** | Perfil de usuario e historial de pedidos |
| **Settings** | Ajustes y referencia de deep links |
| **Login** | Pantalla de inicio de sesion |

---

## Estructura del proyecto

```
src/
├── context/
│   └── CartContext.tsx      # Estado global del carrito (React Context)
├── data/
│   └── products.ts         # Catalogo de productos demo
├── views/
│   ├── Home.tsx
│   ├── ProductDetails.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Profile.tsx
│   ├── Settings.tsx
│   └── Login.tsx
└── components/
    └── CustomDrawerContent.tsx
App.tsx                      # Navegacion raiz + tipos
```

---

## Estructura de navegacion

```
RootDrawer (Drawer.Navigator)
└── Inicio (MainStack — Stack.Navigator)
    ├── HomeTabs (Tab.Navigator)
    │   ├── Home
    │   ├── Profile
    │   └── Settings
    ├── ProductDetails  ← recibe { productId: number }
    ├── Cart
    ├── Checkout
    └── Login
```

---

## Como ejecutar

### Requisitos
- Node.js >= 18
- Expo Go en tu dispositivo (si usas Expo) o entorno de simulador configurado.

### Con Expo (Recomendado)

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
3. Escanear el codigo QR en la terminal con la aplicacion Expo Go.

### Con React Native CLI (Prebuild)

Si prefieres ejecutarlo como una aplicacion nativa:

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar para Android:
   ```bash
   npx expo run:android
   ```
3. Ejecutar para iOS (solo macOS):
   ```bash
   npx expo run:ios
   ```

---

## Dependencias instaladas

El proyecto utiliza las siguientes librerias principales:

- **Core**: `expo`, `react`, `react-native`.
- **Navegacion**: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `@react-navigation/drawer`, `expo-router`.
- **IU y Animaciones**: `react-native-reanimated`, `react-native-gesture-handler`, `react-native-safe-area-context`, `react-native-screens`.
- **Utilidades**: `expo-linking`, `expo-font`, `expo-image`, `expo-haptics`, `expo-status-bar`.

Lista completa desde `package.json`:
- `@expo/vector-icons`
- `@react-navigation/bottom-tabs`
- `@react-navigation/drawer`
- `@react-navigation/elements`
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `expo`
- `expo-constants`
- `expo-font`
- `expo-haptics`
- `expo-image`
- `expo-linking`
- `expo-router`
- `expo-splash-screen`
- `expo-status-bar`
- `expo-symbols`
- `expo-system-ui`
- `expo-web-browser`
- `react`
- `react-native`
- `react-native-gesture-handler`
- `react-native-reanimated`
- `react-native-safe-area-context`
- `react-native-screens`

---

## Deep Linking

### Configuracion

El prefijo configurado es `myapp://`. En Expo Go tambien funciona con la URL `exp://`.

### URLs soportadas

| URL | Pantalla |
|---|---|
| `myapp://home` | Home (lista de productos) |
| `myapp://product/1` | Detalle del producto con ID 1 |
| `myapp://cart` | Carrito de compras |
| `myapp://checkout` | Finalizar compra |
| `myapp://profile` | Perfil de usuario |
| `myapp://settings` | Ajustes |
| `myapp://login` | Pantalla de login |

---

## Patrones clave implementados

- **Tipado de parametros**: Uso de `MainStackParamList` para asegurar que las rutas reciban los datos correctos.
- **Header dinamico**: Uso de `navigation.setOptions` para actualizar botones y titulos en tiempo real.
- **CustomDrawerContent**: Componente personalizado para el menu lateral con avatar y cierre de sesion.
- **CartContext**: Gestion centralizada del estado del carrito mediante React Context API.

---

## Flujo de compra

1. **Home**: Lista de productos.
2. **ProductDetails**: Detalle y adicion al carrito.
3. **Cart**: Gestion de cantidades y resumen.
4. **Checkout**: Formulario de pago y confirmacion.
5. **Confirmacion**: Retorno a Home tras finalizar el pedido.
