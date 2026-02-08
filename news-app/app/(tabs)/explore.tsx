import CategoryTabs from "@/components/CategoryTabs";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";
import { Fonts } from "@/constants/theme";
import { getNewsCounts, newsData } from "@/data/newsData";
import { CategoryType, News } from "@/types";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("Todas");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Contadores de noticias por categoría
  const newsCounts = useMemo(() => getNewsCounts(), []);

  // Filtrar y ordenar noticias
  const filteredNews = useMemo(() => {
    let filtered = newsData;

    // Filtrar por categoría
    if (selectedCategory !== "Todas") {
      filtered = filtered.filter((news) => news.category === selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(query) ||
          news.description.toLowerCase().includes(query) ||
          news.author.toLowerCase().includes(query) ||
          news.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleNewsPress = (news: News) => {
    Alert.alert(news.title, `Por: ${news.author}\n\n${news.description}`, [
      { text: "Cerrar", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explorar</Text>
        <Text style={styles.headerSubtitle}>Encuentra lo que te interesa</Text>
      </View>

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        newsCount={newsCounts}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.newsContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredNews.map((news) => (
          <NewsCard key={news.id} news={news} onPress={handleNewsPress} />
        ))}

        {filteredNews.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No hay resultados</Text>
            <Text style={styles.emptyText}>
              Prueba con otra categoría o término de búsqueda.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Fonts.rounded,
    fontWeight: "900",
    color: "#1a1a1a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  newsContainer: {
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 15,
    color: "#999",
    textAlign: "center",
  },
});
