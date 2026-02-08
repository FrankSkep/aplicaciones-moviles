import { categories } from "@/data/newsData";
import React from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CategoryTabsProps } from "../types";
import { IconSymbol } from "./ui/icon-symbol";

const { width } = Dimensions.get("window");

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  newsCount,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;
          const count = newsCount?.[category.name] ?? 0;

          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                isSelected && {
                  backgroundColor: category.color,
                  shadowColor: category.color,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                },
              ]}
              onPress={() => onSelectCategory(category.name)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryContent}>
                <IconSymbol
                  name={category.icon as any}
                  size={20}
                  color={isSelected ? "#fff" : category.color}
                />
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                  {newsCount && (
                    <View
                      style={[styles.badge, isSelected && styles.badgeActive]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          isSelected && styles.badgeTextActive,
                        ]}
                      >
                        {count}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  scrollContent: {
    paddingHorizontal: width > 400 ? 16 : 12,
    paddingVertical: 16,
    gap: 12,
  },
  categoryTab: {
    borderRadius: 24,
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width > 400 ? 18 : 14,
    paddingVertical: 10,
    gap: 10,
  },
  categoryIcon: {
    display: "none",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryText: {
    fontSize: width > 400 ? 15 : 14,
    fontWeight: "700",
    color: "#2c3e50",
  },
  categoryTextActive: {
    color: "#fff",
  },
  badge: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: "center",
  },
  badgeActive: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#666",
  },
  badgeTextActive: {
    color: "#fff",
  },
});

export default CategoryTabs;
