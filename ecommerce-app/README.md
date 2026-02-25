# 🛍️ TechShop — App de Comercio Electrónico con React Native

Aplicación de e-commerce desarrollada en **Expo + React Native** con **TypeScript**, que demuestra la integración de **Stack Navigator**, **Bottom Tabs** y **Drawer Navigator** junto con un carrito de compras funcional.

---

## 📱 Pantallas

| Pantalla | Descripción |
|---|---|
| **Home** | Lista de productos con búsqueda y filtro por categoría |
| **ProductDetails** | Detalle del producto con header dinámico, favoritos y compartir |
| **Cart** | Resumen del carrito con gestión de cantidades |
| **Checkout** | Formulario de envío y pago |
| **Profile** | Perfil de usuario e historial de pedidos |
| **Settings** | Ajustes y referencia de deep links |
| **Login** | Pantalla de inicio de sesión |

---

## 🗂️ Estructura del proyecto

```
src/
├── context/
│   └── CartContext.tsx      # Estado global del carrito (React Context)
├── data/
│   └── products.ts         # Catálogo de productos demo
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
App.tsx                      # Navegación raíz + tipos
```

---

## 🧭 Estructura de navegación

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

## 🚀 Cómo ejecutar

### Requisitos
- Node.js ≥ 18
- Expo CLI instalado globalmente: `npm i -g expo-cli`
- App **Expo Go** en tu teléfono (iOS o Android)

### Instalación

```bash
# Clonar / descomprimir el proyecto
cd ecommerce-app

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
# o
expo start
```

Escanea el QR con la app Expo Go o pulsa `a` para Android / `i` para iOS en simulador.

---

## 🔗 Deep Linking

### Configuración

El prefijo configurado es `myapp://`. En Expo Go también funciona con la URL `exp://`.

### URLs soportadas

| URL | Pantalla |
|---|---|
| `myapp://home` | Home (lista de productos) |
| `myapp://product/1` | Detalle del producto con ID 1 |
| `myapp://product/3` | Detalle del producto con ID 3 |
| `myapp://cart` | Carrito de compras |
| `myapp://checkout` | Finalizar compra |
| `myapp://profile` | Perfil de usuario |
| `myapp://settings` | Ajustes |
| `myapp://login` | Pantalla de login |

### Cómo probar deep links

**Android (adb):**
```bash
# Asegúrate de tener adb instalado y el dispositivo conectado
adb shell am start -W -a android.intent.action.VIEW -d "myapp://product/1"
adb shell am start -W -a android.intent.action.VIEW -d "myapp://cart"
```

**iOS (Simulator):**
```bash
xcrun simctl openurl booted "myapp://product/1"
xcrun simctl openurl booted "myapp://home"
```

**Expo Go (durante desarrollo):**
```bash
npx uri-scheme open "exp://127.0.0.1:8081/--/product/1" --android
# o abre la URL directamente desde el navegador del dispositivo
```

**Programáticamente (dentro de la app):**
```ts
import * as Linking from 'expo-linking';
Linking.openURL('myapp://product/2');
```

---

## 🧩 Patrones clave implementados

### 1. Tipado de parámetros entre pantallas

```ts
// App.tsx
export type MainStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabsParamList> | undefined;
  ProductDetails: { productId: number };  // ← parámetro tipado
  Cart: undefined;
  Checkout: undefined;
  Login: undefined;
};
```

### 2. Navegación con parámetros

```ts
// Desde Home → ProductDetails
navigation.navigate("ProductDetails", { productId: product.id });

// Desde Checkout → Home (tras completar pedido)
navigation.navigate("HomeTabs", { screen: "Home" });
```

### 3. Header dinámico con navigation.setOptions

```ts
// ProductDetails.tsx — actualiza el header cuando cambian favoritos
useEffect(() => {
  navigation.setOptions({
    title: product.name,
    headerRight: () => (
      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity onPress={() => toggleFavorite(productId)}>
          <Text>{isFav ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Text>📤</Text>
        </TouchableOpacity>
      </View>
    ),
  });
}, [product, isFav]);
```

### 4. CustomDrawerContent con logout

```ts
// CustomDrawerContent.tsx
const handleLogout = () => {
  props.navigation.navigate("Inicio", { screen: "Login" });
};

<TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
  <Text>🚪 Cerrar sesión</Text>
</TouchableOpacity>
```

### 5. CartContext — estado global

```ts
// Acceder al carrito desde cualquier componente
const { addToCart, items, totalItems, totalPrice } = useCart();
```

---

## 📦 Dependencias principales

```json
{
  "@react-navigation/native": "^7.x",
  "@react-navigation/native-stack": "^7.x",
  "@react-navigation/bottom-tabs": "^7.x",
  "@react-navigation/drawer": "^7.x",
  "expo-linking": "~8.x",
  "react-native-gesture-handler": "~2.x",
  "react-native-reanimated": "~4.x"
}
```

---

## 🎓 Objetivos de aprendizaje cubiertos

- ✅ Stack + Bottom Tabs + Drawer combinados
- ✅ Paso de parámetros tipados con `RootStackParamList`
- ✅ Header personalizado con `navigation.setOptions`
- ✅ Deep linking configurado con `myapp://`
- ✅ `CustomDrawerContent` con avatar, info de usuario y logout
- ✅ Estado global del carrito con React Context
- ✅ Flujo completo: Home → ProductDetails → Cart → Checkout

---

## 🔄 Flujo de compra

```
Home (lista productos)
    ↓ tap en producto
ProductDetails (+ favorito / compartir)
    ↓ "Añadir al carrito"
Cart (ver resumen, ajustar cantidades)
    ↓ "Proceder al pago"
Checkout (formulario datos + pago)
    ↓ "Pagar"
✅ Confirmación → Vuelta a Home
```
