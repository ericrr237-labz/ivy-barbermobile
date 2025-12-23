
import { useContext, useState, useEffect} from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { theme } from "../config/theme";
import { apiRequest } from "../api/api";
import { Pressable } from "react-native";
import { Image } from "react-native"
import { Keyboard, Animated } from "react-native";
import { useRef } from "react";

import * as SecureStore from "expo-secure-store";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const translateY = useRef(new Animated.Value(0)).current;





  const handleLogin = async () => {
    try {
      const data = await apiRequest("/auth/login", "POST", {
        email,
        password,
      });

      await SecureStore.setItemAsync("token", data.token);
      setToken(data.token);

      
      navigation.reset({
        index: 0,
        routes: [{ name: "App" }],
      });

    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };
  useEffect(() => {
  const showSub = Keyboard.addListener("keyboardDidShow", () => {
    Animated.timing(translateY, {
      toValue: -40,
      duration: 250,
      useNativeDriver: true,
    }).start();
  });

  const hideSub = Keyboard.addListener("keyboardDidHide", () => {
    Animated.timing(translateY, {
      toValue:0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  });

  return () => {
    showSub.remove();
    hideSub.remove();
  };
}, []);

  return (
  <View style={{flexGrow:1, alignItems:"center", backgroundColor: theme.bg }}>

    {/* LOGO */}
    <View style={{ alignItems: "center", justifyContent:'center' }}>
      <Image
        source={require("../../assets/ivy-bot.png")}
        style={{ width: 200, height: 300, resizeMode: "contain" }}
      />
    </View>

    {/* FORM */}
    <Animated.View
      style={{ 
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:theme.bg,
        transform: [{ translateY }],
      }}
    >
      {/* GLOW */}
      <View
        style={{
          padding: 6,
          borderRadius: 30,
          backgroundColor: "rgba(58,123,255,0.25)",
          shadowColor: "#3A7BFF",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 40,
          elevation: 30,

        }}
      >
        {/* CARD */}
        <View
          style={{
          
            width: 260,
            padding: 24,
            borderRadius: 24,
            backgroundColor: "rgba(26,29,36,0.95)",
            borderWidth: 1,
            borderColor: "rgba(58,123,255,0.25)",
          }}
        >
          <Text style={{ color: theme.text, fontSize: 22, marginBottom: 20 }}>
            Login
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor={theme.muted}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              color: theme.text,
              borderBottomWidth: 1,
              borderColor: theme.muted,
              marginBottom: 20,
            }}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.muted}
            secureTextEntry
            style={{
              color: theme.text,
              borderBottomWidth: 1,
              borderColor: theme.muted,
              marginBottom: 24,
            }}
            onChangeText={setPassword}
          />

          <Pressable
            onPress={handleLogin}
            style={{
              backgroundColor: "#3A7BFF",
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>

  </View>

) };