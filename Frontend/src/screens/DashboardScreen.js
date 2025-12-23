import { View, Text, StyleSheet, ScrollView, Image, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../config/theme";

export default function DashboardScreen() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:theme.bg}}>
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/ivy-bot.png")} // replace with your logo
              style={styles.logo}
            />
            <View>
              <Text style={styles.title}>IVY Barbers</Text>
              <Text style={styles.subtitle}>Top League Dashboard</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Today at a Glance */}
        <Text style={styles.sectionTitle}>Today at a Glance</Text>

        <View style={styles.cardRow}>
          <StatCard label="Today" value="$420" accent="#2ECC71" />
          <StatCard label="Clients" value="7" accent="#3A7BFF" />
        </View>

        <View style={styles.cardRow}>
          <StatCard label="Net Profit" value="$310" accent="#7B61FF" />
          <StatCard label="Avg Cut" value="$60" accent="#9BA1B8" />
        </View>

        {/* Today's Clients */}
        <Text style={styles.sectionTitle}>Today's Clients</Text>

        <ClientRow time="2:30 PM" name="Marcus R." service="Fade + Beard" price="$65" done />
        <ClientRow time="3:15 PM" name="Jason T." service="Buzz Cut" price="$50" />
        <ClientRow time="4:00 PM" name="Eric L." service="Combover" price="$75" />
        <ClientRow time="5:00 PM" name="Kevin S." service="Shave & Trim" price="$40" />

        {/* This Week */}
        <Text style={styles.sectionTitle}>This Week</Text>

        <View style={styles.cardRow}>
          <InfoCard title="Best Day" value="Friday" />
          <InfoCard title="Worst Day" value="Monday" />
        </View>

        <View style={styles.cardRow}>
          <InfoCard title="Return Rate" value="48%" />
          <InfoCard title="Peak Hour" value="3–6 PM" />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionRow}>
          <ActionButton label="Add Walk-In" />
          <ActionButton label="New Booking" />
        </View>

        <View style={styles.actionRow}>
          <ActionButton label="Log Expense" />
          <ActionButton label="View Reports" />
        </View>

      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ label, value, accent }) {
  return (
    <View style={[styles.statCard, { borderColor: accent }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function InfoCard({ title, value }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ClientRow({ time, name, service, price, done }) {
  return (
    <View style={styles.clientRow}>
      <Text style={styles.clientTime}>{time}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.clientName}>{name}</Text>
        <Text style={styles.clientService}>{service}</Text>
      </View>
      <Text style={styles.clientPrice}>{price}</Text>
      <View style={[
        styles.statusDot,
        { backgroundColor: done ? "#2ECC71" : "#3A7BFF" }
      ]} />
    </View>
  );
}

function ActionButton({ label }) {
  return (
    <Pressable style={styles.actionButton}>
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 40,
    height: 40,
  },

  title: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "600",
  },

  subtitle: {
    color: "#9BA1B8",
    fontSize: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  sectionTitle: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 12,
  },

  cardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },

  statValue: {
    color: "#E5E7EB",
    fontSize: 22,
    fontWeight: "700",
  },

  statLabel: {
    color: "#9BA1B8",
    marginTop: 4,
  },

  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1D24",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },

  clientTime: {
    color: "#9BA1B8",
    width: 70,
  },

  clientName: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  clientService: {
    color: "#9BA1B8",
    fontSize: 12,
  },

  clientPrice: {
    color: "#E5E7EB",
    fontWeight: "600",
    marginRight: 10,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  infoCard: {
    flex: 1,
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    padding: 16,
  },

  infoTitle: {
    color: "#9BA1B8",
    fontSize: 12,
  },

  infoValue: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  actionButton: {
    flex: 1,
    backgroundColor: "#3A7BFF",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
