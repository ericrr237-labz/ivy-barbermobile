import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../config/theme";

export default function FinanceScreen() {
  return (
     <SafeAreaView style={{flex:1, backgroundColor:theme.bg}}>
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <Text style={styles.header}>Finance</Text>

        {/* Summary Cards */}
        <View style={styles.row}>
          <FinanceCard
            title="Revenue"
            value="$2,450"
            color="#2ECC71"
          />
          <FinanceCard
            title="Expenses"
            value="$680"
            color="#FF6B6B"
          />
        </View>

        <View style={styles.row}>
          <FinanceCard
            title="Net Profit"
            value="$1,770"
            color="#3A7BFF"
            full
          />
        </View>

        {/* Breakdown */}
        <Text style={styles.sectionTitle}>This Week</Text>

        <View style={styles.breakdownCard}>
          <BreakdownRow label="Avg / Day" value="$350" />
          <BreakdownRow label="Top Expense" value="Supplies" />
          <BreakdownRow label="Best Day" value="Friday" />
        </View>

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <Transaction
          type="income"
          label="Fade + Beard"
          amount="+$65"
          date="Jan 16"
        />

        <Transaction
          type="expense"
          label="Clipper Oil"
          amount="-$25"
          date="Jan 15"
        />

        <Transaction
          type="income"
          label="Walk-in"
          amount="+$50"
          date="Jan 15"
        />

        <Transaction
          type="expense"
          label="Razor Blades"
          amount="-$40"
          date="Jan 14"
        />

      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable style={styles.expenseBtn}>
          <Text style={styles.actionText}>Add Expense</Text>
        </Pressable>

        <Pressable style={styles.incomeBtn}>
          <Text style={styles.actionText}>Add Income</Text>
        </Pressable>
      </View>

    </View>
    </SafeAreaView>
  );
}

/* ---------- COMPONENTS ---------- */

function FinanceCard({ title, value, color, full }) {
  return (
    <View
      style={[
        styles.financeCard,
        full && { flex: 1 },
        { borderColor: color },
      ]}
    >
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
    </View>
  );
}

function BreakdownRow({ label, value }) {
  return (
    <View style={styles.breakdownRow}>
      <Text style={styles.breakdownLabel}>{label}</Text>
      <Text style={styles.breakdownValue}>{value}</Text>
    </View>
  );
}

function Transaction({ type, label, amount, date }) {
  const isIncome = type === "income";

  return (
    <View style={styles.transaction}>
      <View>
        <Text style={styles.transactionLabel}>{label}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          { color: isIncome ? "#2ECC71" : "#FF6B6B" },
        ]}
      >
        {amount}
      </Text>
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
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  financeCard: {
    flex: 1,
    backgroundColor: "#1A1D24",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
  },

  cardTitle: {
    color: "#9BA1B8",
    fontSize: 12,
  },

  cardValue: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 6,
  },

  sectionTitle: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 12,
  },

  breakdownCard: {
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },

  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  breakdownLabel: {
    color: "#9BA1B8",
  },

  breakdownValue: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1A1D24",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },

  transactionLabel: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  transactionDate: {
    color: "#9BA1B8",
    fontSize: 12,
  },

  transactionAmount: {
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },

  expenseBtn: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  incomeBtn: {
    flex: 1,
    backgroundColor: "#2ECC71",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
