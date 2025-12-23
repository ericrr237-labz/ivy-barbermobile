import { View, Text } from "react-native";
import { theme } from "../src/config/theme";

export default function ScreenHeader({ title }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          color: theme.text,
          fontSize: 24,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </View>
  );
}
