import { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constant/styles";

function normalize(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function VyhladavanieVydavkov({ vydavky, onFilteredChange }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return vydavky;

    const nq = normalize(q);
    return vydavky.filter((v) => normalize(v.popis).includes(nq));
  }, [query, vydavky]);

  useEffect(() => {
    onFilteredChange(filtered);
  }, [filtered, onFilteredChange]);

  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <Ionicons
          name="search"
          size={18}
          color={GlobalStyles.colors.gray500}
          style={styles.icon}
        />

        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={GlobalStyles.colors.gray500}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />

        <Pressable style={styles.rightSegment}>
          <Text style={styles.rightText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 8,
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: GlobalStyles.colors.primary50,
  },

  icon: {
    paddingLeft: 14,
    paddingRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: GlobalStyles.colors.gray700,
    paddingVertical: 0, 
    paddingRight: 12,
  },

  rightSegment: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 18,
    backgroundColor: GlobalStyles.colors.primary400,

    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },

  rightText: {
    fontSize: 16,
    fontWeight: "600",
    color: GlobalStyles.colors.primary50,
  },
});