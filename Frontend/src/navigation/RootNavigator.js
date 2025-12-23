import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppTabs from "./AppTabs";
import BookingScreen from "../screens/BookingsScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="App" component={AppTabs} />
      <Stack.Screen name="AddBooking" component={BookingScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen}/>
    </Stack.Navigator>
  );
}
