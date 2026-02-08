import React from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { NewsCardProps } from "../types";
import { IconSymbol } from "./ui/icon-symbol";

const { width } = Dimensions.get("window");
const CARD_MARGIN = width > 400 ? 16 : 12;
const CARD_WIDTH = width - CARD_MARGIN * 2;

const NewsCard: React.FC<NewsCardProps> = ({ news, onPress }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffHours < 1) return "Hace unos minutos";
    if (diffHours < 24) return `Hace ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  const formatViews = (views: string): string => {
    return views;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={() => onPress?.(news)}
    >
      {/* Imagen con overlay sutil */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: news.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />

        {/* Badges especiales */}
        <View style={styles.topBadges}>
          {news.breaking && (
            <View style={styles.breakingBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.breakingText}>ÚLTIMA HORA</Text>
            </View>
          )}
          {news.featured && !news.breaking && (
            <View style={styles.featuredBadge}>
              <IconSymbol
                name="star.fill"
                size={14}
                color="#ffd700"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.featuredText}>DESTACADA</Text>
            </View>
          )}
        </View>

        {/* Badge de categoría */}
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: news.categoryColor },
          ]}
        >
          <Text style={styles.categoryBadgeText}>{news.category}</Text>
        </View>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {news.title}
        </Text>

        <Text style={styles.description} numberOfLines={3}>
          {news.description}
        </Text>

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {news.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer mejorado */}
        <View style={styles.footer}>
          <View style={styles.authorContainer}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorInitial}>{news.author.charAt(0)}</Text>
            </View>
            <View style={styles.authorInfo}>
              <Text style={styles.author}>{news.author}</Text>
              <Text style={styles.date}>{formatDate(news.date)}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <IconSymbol
                name="book.fill"
                size={14}
                color="#666"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.statText}>{news.readTime} min</Text>
            </View>
            <View style={styles.stat}>
              <IconSymbol
                name="eye.fill"
                size={14}
                color="#666"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.statText}>{formatViews(news.views)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: width > 400 ? 20 : 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    width: CARD_WIDTH,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: width > 400 ? 220 : 200,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  topBadges: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    gap: 8,
  },
  breakingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  breakingText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  featuredBadge: {
    backgroundColor: "rgba(251, 191, 36, 0.95)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featuredText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
  },
  categoryBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  content: {
    padding: width > 400 ? 18 : 16,
  },
  title: {
    fontSize: width > 400 ? 19 : 17,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 10,
    lineHeight: width > 400 ? 26 : 24,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: width > 400 ? 14 : 13,
    color: "#666",
    lineHeight: 21,
    marginBottom: 14,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#555",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
  },
  authorInitial: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  authorInfo: {
    flex: 1,
  },
  author: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
    color: "#999",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statIcon: {
    fontSize: 14,
  },
  statText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
});

export default NewsCard;
