import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { styles } from "../src/config/theme";

const TIME_RANGES = ["Week", "Day", "Month"];

export default function TimeToggle({ onChange }) {
  const [index, setIndex] = useState(0); // 0 = Week
  const [menuOpen, setMenuOpen] = useState(false);

  const cycleRange = () => {
    const nextIndex = (index + 1) % TIME_RANGES.length;
    setIndex(nextIndex);
    onChange?.(TIME_RANGES[nextIndex]);
  };

  const selectRange = (i) => {
    setIndex(i);
    setMenuOpen(false);
    onChange?.(TIME_RANGES[i]);
  };
  const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
    },
    toggle: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#1A1D24",
    },
    label: {
        color: "#3A7BFF",
        fontWeight: "600",
    },
    menu: {
        position: "absolute",
        top: 40,
        right: 0,
        backgroundColor: "#1A1D24",
        borderRadius: 8,
        overflow: "hidden",
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    menuText: {
        color: "#FFFFFF",
    },
    });

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={cycleRange}
        onLongPress={() => setMenuOpen(true)}
        style={styles.toggle}
      >
        <Text style={styles.label}>This {TIME_RANGES[index]}</Text>
      </Pressable>

      {menuOpen && (
        <View style={styles.menu}>
          {TIME_RANGES.map((range, i) => (
            <Pressable
              key={range}
              onPress={() => selectRange(i)}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>{range}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
