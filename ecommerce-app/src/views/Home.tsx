import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../App";
import { CATEGORIES, PRODUCTS, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { AntDesign } from "@expo/vector-icons";

type Nav = NativeStackNavigationProp<MainStackParamList>;

export default function Home() {
  const navigation = useNavigation<Nav>();
  const { totalItems } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "Todos" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const goToProduct = (product: Product) => {
    navigation.navigate("ProductDetails", { productId: product.id });
  };

  const goToCart = () => {
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#94a3b8"
        />
        <TouchableOpacity style={styles.cartBtn} onPress={goToCart}>
          <AntDesign name="shoppingcart" size={24} color="#fff" />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.catList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.catChip, selectedCategory === item && styles.catChipActive]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.catText, selectedCategory === item && styles.catTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No se encontraron productos</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => goToProduct(item)} activeOpacity={0.85}>
            <Text style={styles.emoji}>{item.image}</Text>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.cardRating}>
                <AntDesign name="star" size={12} color="#f59e0b" />
                <Text style={styles.cardRatingText}> {item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  searchRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, gap: 10 },
  searchInput: { flex: 1, backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: "#1e293b", borderWidth: 1, borderColor: "#e2e8f0" },
  cartBtn: { width: 46, height: 46, backgroundColor: "#0f766e", borderRadius: 12, alignItems: "center", justifyContent: "center" },
  badge: { position: "absolute", top: -4, right: -4, backgroundColor: "#ef4444", borderRadius: 10, minWidth: 20, height: 20, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  catList: { paddingHorizontal: 16, paddingBottom: 10, gap: 8 },
  catChip: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0" },
  catChipActive: { backgroundColor: "#0f766e", borderColor: "#0f766e" },
  catText: { fontSize: 13, color: "#64748b", fontWeight: "500" },
  catTextActive: { color: "#fff" },
  grid: { paddingHorizontal: 12, paddingBottom: 20 },
  card: { flex: 1, backgroundColor: "#fff", margin: 6, borderRadius: 16, padding: 14, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  emoji: { fontSize: 40, marginBottom: 8, textAlign: "center" },
  cardCategory: { fontSize: 11, color: "#0f766e", fontWeight: "600", textTransform: "uppercase", marginBottom: 4 },
  cardName: { fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 8, lineHeight: 20 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardPrice: { fontSize: 15, fontWeight: "700", color: "#0f766e" },
  cardRating: { flexDirection: "row", alignItems: "center" },
  cardRatingText: { fontSize: 12, color: "#64748b" },
  empty: { flex: 1, alignItems: "center", paddingTop: 60 },
  emptyText: { color: "#94a3b8", fontSize: 15 },
});
