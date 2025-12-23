import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../config/theme";

const weekDays = [
  { day: "Mon", date: 15 },
  { day: "Tue", date: 16 },
  { day: "Wed", date: 17 },
  { day: "Thu", date: 18 },
  { day: "Fri", date: 19 },
  { day: "Sat", date: 20 },
  { day: "Sun", date: 21 },
];

export default function BookingsScreen() {
  const [selected, setSelected] = useState(16);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:theme.bg}}>
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Bookings</Text>

      {/* Calendar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.calendar}
      >
        {weekDays.map(d => (
          <Pressable
            key={d.date}
            onPress={() => setSelected(d.date)}
            style={[
              styles.dayCard,
              selected === d.date && styles.dayCardActive
            ]}
          >
            <Text style={styles.dayText}>{d.day}</Text>
            <Text style={styles.dateText}>{d.date}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Day Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryDate}>Tuesday, Jan {selected}</Text>
        <Text style={styles.summaryMeta}>6 bookings · $355 expected</Text>
      </View>

      {/* Booking List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <BookingCard
          time="2:30 PM"
          name="Marcus R."
          service="Fade + Beard"
          price="$65"
        />
        <BookingCard
          time="3:15 PM"
          name="Jason T."
          service="Buzz Cut"
          price="$50"
        />
        <BookingCard
          time="4:00 PM"
          name="Eric L."
          service="Combover"
          price="$75"
        />
        <BookingCard
          time="5:00 PM"
          name="Kevin S."
          service="Shave & Trim"
          price="$40"
        />
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable style={styles.fab}>
        <Text style={styles.fabText}>＋</Text>
      </Pressable>

    </View>
    </SafeAreaView>
  

  );
}

/* ---------- COMPONENT ---------- */

function BookingCard({ time, name, service, price }) {
  return (
    <View style={styles.bookingCard}>
      <Text style={styles.bookingTime}>{time}</Text>

      <View style={{ flex: 1 }}>
        <Text style={styles.bookingName}>{name}</Text>
        <Text style={styles.bookingService}>{service}</Text>
      </View>

      <Text style={styles.bookingPrice}>{price}</Text>
    </View>
  );
}


/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
    padding: 16,
  },

  header: {
    color: "#E5E7EB",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },

  calendar: {
    marginBottom: 16,
  },

  dayCard: {
    backgroundColor: "#1A1D24",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    marginRight: 10,
    width: 64,
  },

  dayCardActive: {
    borderColor: "#3A7BFF",
    borderWidth: 1,
  },

  dayText: {
    color: "#9BA1B8",
    fontSize: 12,
  },

  dateText: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },

  summary: {
    marginBottom: 12,
  },

  summaryDate: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "600",
  },

  summaryMeta: {
    color: "#9BA1B8",
    fontSize: 12,
    marginTop: 2,
  },

  bookingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },

  bookingTime: {
    color: "#9BA1B8",
    width: 80,
  },

  bookingName: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  bookingService: {
    color: "#9BA1B8",
    fontSize: 12,
  },

  bookingPrice: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#3A7BFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },

  fabText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "300",
  },
  
});
