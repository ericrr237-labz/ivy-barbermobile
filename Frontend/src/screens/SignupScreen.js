import { View, Text } from "react-native";
import { theme } from "../config/theme";

export default function SignupScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.text, fontSize: 20 }}>
        Signup Screen
      </Text>
    </View>
  );
}
