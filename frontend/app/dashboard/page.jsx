"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import ExpenseList from "@/components/ExpenseList";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from "./Dashboard.module.css";
import { getToken } from "@/utils/auth";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      console.log("Token being sent:", getToken());

      const expRes = await api.get("/api/expenses");
      const allExpenses = Array.isArray(expRes.data)
        ? expRes.data
        : expRes.data.items || expRes.data.expenses || [];

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const lastMonthExpenses = allExpenses.filter(
        (e) => new Date(e.date) >= oneMonthAgo
      );

      setExpenses(lastMonthExpenses);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      setError("Failed to fetch expenses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch expenses on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Update chartData whenever expenses change
  useEffect(() => {
    const grouped = expenses.reduce((acc, e) => {
      const catName = e.category?.name || "Uncategorized";
      acc[catName] = (acc[catName] || 0) + e.amount;
      return acc;
    }, {});

    setChartData(
      Object.entries(grouped).map(([name, value]) => ({ name, value }))
    );
  }, [expenses]);

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];

  return (
    <div className="flex flex-col gap-10 p-6 min-h-screen text-white bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] pt-20">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Stats Summary */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard}`}>
          <h3 className={`${styles.statTitle} ${styles.totalExpenses}`}>
            Total Expenses
          </h3>
          <p className={`${styles.statValue}`}>
            Rs {expenses.reduce((sum, e) => sum + e.amount, 0)}
          </p>
        </div>
        <div className={`${styles.statCard}`}>
          <h3 className={`${styles.statTitle} ${styles.transactions}`}>
            Transactions
          </h3>
          <p className={`${styles.statValue}`}>{expenses.length}</p>
        </div>
        <div className={`${styles.statCard}`}>
          <h3 className={`${styles.statTitle} ${styles.categories}`}>
            Categories
          </h3>
          <p className={`${styles.statValue}`}>{chartData.length}</p>
        </div>
      </div>

      {/* Expenses List */}
      <div className={styles.expenseSection}>
        <h2 className={styles.expensesTitle}>
          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
          List Of Expenses
        </h2>
        <div className={styles.expensesContainer}>
          <ExpenseList
            expenses={expenses}
            onDelete={(id) => setExpenses((prev) => prev.filter((e) => e._id !== id))}
            onAdd={(newExpense) => setExpenses((prev) => [...prev, newExpense])}
          />
        </div>
      </div>

      {/* Chart Section */}
      <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>
          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
          Expenses by Category
        </h2>
        <div className="flex justify-center items-center">
          <PieChart width={480} height={340}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#23244a"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
