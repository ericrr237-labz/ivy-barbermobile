import { View, Text, Image, Pressable, TextInput, Button, Alert, ScrollView } from "react-native";
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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={{ height:300, flexDirection:"row",gap:20,
         }}>
     
  
        {/* PROFILE IMAGE */}
        <Pressable onPress={pickImage} style={{ alignItems: "center",alignSelf:"flex-start"
        }}>
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
              marginBottom:20,
              

            }}
          />
          <TextInput
          value={name}
          onChangeText={setName}
          style={{
            width:100,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 8,
            padding: 12,
            color: theme.text,
            marginBottom: 16,
            
          }}
        />
        </Pressable>

        {/* SHOP */}
        <View style={{flex:1,marginTop:18,}}>
        <Text style={{ color: theme.muted, marginBottom: 6, }}>Shop Name</Text>
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
        
        <Text style={{ color: theme.muted, marginBottom: 6 }}>Shop Location</Text>
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
        </View>
        </View>

        {/* SERVICES*/}
        <View style={{ flex:1, alignSelf:"center" }}>
          <View style={{ backgroundColor:"white", height:100, borderRadius: 20, marginBottom:10,
          width:300,
          }}></View>
           <View style={{ backgroundColor:"white", height:100, borderRadius: 20,marginBottom:10,
          width:300,
          }}></View>
        



            <View style={{marginTop:16,}}>
          <Button title="Add Services" color={theme.primary} onPress={() => {}} />
        </View>
           <View>
          <Button title="Manage Services & Prices" color={theme.primary} onPress={() => {}} />
        </View>
        </View>






        {/* ACTIONS */}
        <View>
    
        <Button title="Change Password" color={theme.primary} onPress={() => {}} />
    

        <Button title="Save Profile" color={theme.primary} onPress={saveProfile} />
      

  
        {/* LOGOUT */}
        <Button title="Logout" color="#E5484D" onPress={logout} />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
