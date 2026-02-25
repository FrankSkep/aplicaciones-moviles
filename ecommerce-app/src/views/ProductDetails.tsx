import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../App";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<MainStackParamList, "ProductDetails">;

export default function ProductDetails({ route, navigation }: Props) {
  const { productId } = route.params;
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addToCart, favorites, toggleFavorite } = useCart();

  const isFav = favorites.includes(productId);

  useEffect(() => {
    if (!product) return;
    navigation.setOptions({
      title: product.name,
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 12, marginRight: 4 }}>
          <TouchableOpacity onPress={() => toggleFavorite(productId)}>
            <AntDesign name={isFav ? "heart" : "hearto"} size={22} color={isFav ? "#ef4444" : "#94a3b8"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Compartir", `Compartiendo: ${product.name}\nmyapp://product/${product.id}`)
            }
          >
            <AntDesign name="sharealt" size={22} color="#64748b" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [product, isFav]);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Producto no encontrado</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert("Añadido al carrito", `${product.name} se ha añadido al carrito.`, [
      { text: "Seguir comprando" },
      { text: "Ver carrito", onPress: () => navigation.navigate("Cart") },
    ]);
  };

  const stars = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Text style={styles.emoji}>{product.image}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{product.category}</Text>
          <View style={styles.stockRow}>
            <AntDesign name={product.stock > 0 ? "checkcircle" : "closecircle"} size={12} color={product.stock > 0 ? "#16a34a" : "#ef4444"} />
            <Text style={styles.stock}>
              {product.stock > 0 ? `${product.stock} en stock` : "Sin stock"}
            </Text>
          </View>
        </View>

        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.stars}>{stars}</Text>
          <Text style={styles.ratingNum}>{product.rating} / 5.0</Text>
        </View>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.sectionTitle}>ID del producto</Text>
        <View style={styles.idBox}>
          <Text style={styles.idText}>myapp://product/{product.id}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addBtn, product.stock === 0 && styles.addBtnDisabled]}
        onPress={handleAddToCart}
        disabled={product.stock === 0}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {product.stock > 0 && <AntDesign name="shoppingcart" size={20} color="#fff" />}
          <Text style={styles.addBtnText}>
            {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  content: { paddingBottom: 40 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFound: { fontSize: 16, color: "#94a3b8" },
  imageContainer: { backgroundColor: "#fff", alignItems: "center", paddingVertical: 40 },
  emoji: { fontSize: 100 },
  infoCard: { backgroundColor: "#fff", margin: 16, borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  categoryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  category: { fontSize: 12, color: "#0f766e", fontWeight: "700", textTransform: "uppercase" },
  stockRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  stock: { fontSize: 12, color: "#64748b" },
  name: { fontSize: 22, fontWeight: "700", color: "#1e293b", marginBottom: 10, lineHeight: 30 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  stars: { fontSize: 18, color: "#f59e0b", letterSpacing: 2 },
  ratingNum: { fontSize: 13, color: "#64748b" },
  price: { fontSize: 32, fontWeight: "800", color: "#0f766e", marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, marginTop: 4 },
  description: { fontSize: 15, color: "#475569", lineHeight: 24, marginBottom: 16 },
  idBox: { backgroundColor: "#f1f5f9", borderRadius: 8, padding: 10 },
  idText: { fontSize: 13, color: "#0f766e", fontFamily: "monospace" },
  addBtn: { marginHorizontal: 16, backgroundColor: "#0f766e", borderRadius: 16, paddingVertical: 18, alignItems: "center" },
  addBtnDisabled: { backgroundColor: "#94a3b8" },
  addBtnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
