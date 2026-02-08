import React from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Buscar noticias...",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.searchIcon}>
            <View style={styles.searchCircle} />
            <View style={styles.searchHandle} />
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {value.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => onChangeText("")}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.clearIcon}>
              <View style={styles.clearLine1} />
              <View style={styles.clearLine2} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: width > 400 ? 16 : 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
  },
  iconContainer: {
    marginRight: 12,
  },
  searchIcon: {
    width: 18,
    height: 18,
    position: "relative",
  },
  searchCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#666",
    position: "absolute",
    top: 0,
    left: 0,
  },
  searchHandle: {
    width: 6,
    height: 2,
    backgroundColor: "#666",
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ rotate: "45deg" }],
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearIcon: {
    width: 16,
    height: 16,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  clearLine1: {
    width: 12,
    height: 2,
    backgroundColor: "#999",
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    borderRadius: 1,
  },
  clearLine2: {
    width: 12,
    height: 2,
    backgroundColor: "#999",
    position: "absolute",
    transform: [{ rotate: "-45deg" }],
    borderRadius: 1,
  },
});

export default SearchBar;
