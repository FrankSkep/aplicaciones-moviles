import NewsCard from "@/components/NewsCard";
import { Fonts } from "@/constants/theme";
import { newsData } from "@/data/newsData";
import { News, SortOption } from "@/types";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function App() {
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  // Filtrar y ordenar noticias para el Home (solo destacadas o recientes)
  const homeNews = useMemo(() => {
    // Ordenar
    const sorted = [...newsData].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "popular":
          const viewsA = parseFloat(a.views.replace("k", "")) * 1000;
          const viewsB = parseFloat(b.views.replace("k", "")) * 1000;
          return viewsB - viewsA;
        case "trending":
          const scoreA = (a.breaking ? 100 : 0) + (a.featured ? 50 : 0);
          const scoreB = (b.breaking ? 100 : 0) + (b.featured ? 50 : 0);
          return scoreB - scoreA;
        default:
          return 0;
      }
    });

    return sorted;
  }, [sortBy]);

  const handleNewsPress = (news: News) => {
    Alert.alert(news.title, `Por: ${news.author}\n\n${news.description}`, [
      { text: "Cerrar", style: "cancel" },
    ]);
  };

  const handleSortChange = () => {
    const sortOptions: SortOption[] = ["recent", "popular", "trending"];
    const currentIndex = sortOptions.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setSortBy(sortOptions[nextIndex]);
  };

  const getSortLabel = (): string => {
    switch (sortBy) {
      case "recent":
        return "🕐 Recientes";
      case "popular":
        return "🔥 Populares";
      case "trending":
        return "📈 Tendencia";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Principal</Text>
            <Text style={styles.headerSubtitle}>
              Las mejores historias para ti
            </Text>
          </View>

          <TouchableOpacity
            style={styles.sortButton}
            onPress={handleSortChange}
            activeOpacity={0.7}
          >
            <Text style={styles.sortButtonText}>{getSortLabel()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de noticias */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.newsContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Titulares Destacados</Text>

        {/* Breaking news primero */}
        {homeNews
          .filter((news) => news.breaking)
          .map((news) => (
            <NewsCard key={news.id} news={news} onPress={handleNewsPress} />
          ))}

        <Text style={styles.sectionTitle}>Todas las Noticias</Text>
        {/* Resto de noticias */}
        {homeNews
          .filter((news) => !news.breaking)
          .map((news) => (
            <NewsCard key={news.id} news={news} onPress={handleNewsPress} />
          ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Has llegado al final 📰</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: Fonts.rounded,
    fontWeight: "900",
    color: "#1a1a1a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a1a",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sortButton: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sortButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  newsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600",
  },
});
