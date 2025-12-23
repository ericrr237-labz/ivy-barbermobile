import { View, Text, Image, Pressable, TextInput, Button, Alert } from "react-native";
import { useState, useContext, useEffect} from "react";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../config/theme";
import { apiRequest } from "../api/api";

export default function ProfileScreen() {
  const {token, setToken } = useContext(AuthContext);


  const [name, setName] = useState("Eric");
  const [shop, setShop] = useState("IVY Barber");
  const [photo, setPhoto] = useState(null);
  


  const saveProfile = async () => {
  try {
    await apiRequest(
      "/profile",
      "POST",
      {
        name,
        shopName: shop,
        avatarUrl: photo,
      },
      token
    );

    Alert.alert("Success", "Profile updated");
  } catch (err) {
    Alert.alert("Error", err.message || "Failed to save profile");
  }
};

  // Pick profile image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow photo access to upload a profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Logout
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
  };

  useEffect(() => {
  if (!token) return;

  const loadProfile = async () => {
    try {
      const data = await apiRequest("/profile", "GET", null, token);
      if (!data) return;

      setName(data.name || "");
      setShop(data.shopName || "");
      setPhoto(data.avatarUrl || null);
    } catch (err) {
      console.log("Profile not found");
    }
  };

  loadProfile();
}, [token]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={{ padding: 20 }}>
        {/* HEADER */}
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: "600", marginBottom: 20 }}>
          Profile
        </Text>

        <Text style={{ color: theme.muted, fontSize: 14 }}>Barber</Text>

        {/* PROFILE IMAGE */}
        <Pressable onPress={pickImage} style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={
              photo
                ? { uri: photo }
                : require("../../assets/avatar-placeholder.png")
            }
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
              backgroundColor: "#222",
            }}
          />
          <Text style={{ color: theme.primary, marginTop: 8 }}>
            Change Photo
          </Text>
        </Pressable>

        {/* NAME */}
        <Text style={{ color: theme.muted, marginBottom: 6 }}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 8,
            padding: 12,
            color: theme.text,
            marginBottom: 16,
          }}
        />

        {/* SHOP */}
        <Text style={{ color: theme.muted, marginBottom: 6 }}>Shop Name</Text>
        <TextInput
          value={shop}
          onChangeText={setShop}
          style={{
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 8,
            padding: 12,
            color: theme.text,
            marginBottom: 24,
          }}
        />

        {/* ACTIONS */}
        <View style={{ marginBottom: 16 }}>
          <Button title="Manage Services & Prices" onPress={() => {}} />
        </View>

        <View style={{ marginBottom: 24 }}>
          <Button title="Change Password" onPress={() => {}} />
        </View>

        <View>
        <Button title="Save Profile" onPress={saveProfile} />
        </View>


        {/* LOGOUT */}
        <Button title="Logout" color="#E5484D" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}
