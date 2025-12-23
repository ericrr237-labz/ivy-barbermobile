import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

function AppInner() {
  const { loading } = useContext(AuthContext);
  if (loading) return <ActivityIndicator />;
  return <RootNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </AuthProvider>
  );
}
