import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useExpenseStore } from "@/store/useExpenseStore";
import { ArrowUpRight, ArrowDownLeft, Wallet, Activity, TrendingUp, Receipt as ReceiptIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useAuthStore } from "@/store/useAuthStore";
import { useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CreateGroupDialog } from "@/components/groups/CreateGroupDialog";

export default function Dashboard() {
  const { expenses, groups } = useExpenseStore();
  const { user } = useAuthStore();

  const { totalOwed, totalOwe, totalBalance, recentExpenses, chartData } = useMemo(() => {
    let owed = 0;
    let owe = 0;
    const currentUserId = user?.id;

    if (!currentUserId) return { totalOwed: 0, totalOwe: 0, totalBalance: 0, recentExpenses: [], chartData: [] };

    expenses.forEach(expense => {
      if (expense.paidBy === currentUserId) {
        const share = expense.amount / (expense.participants.length || 1);
        const amIParticipant = expense.participants.includes(currentUserId);
        const othersCount = expense.participants.length - (amIParticipant ? 1 : 0);
        owed += share * othersCount;
      } else if (expense.participants.includes(currentUserId)) {
        const share = expense.amount / (expense.participants.length || 1);
        owe += share;
      }
    });

    const balance = owed - owe;

    // Monthly data for chart
    const monthlyData: Record<string, number> = {};
    expenses.forEach(e => {
      const month = format(new Date(e.date), 'MMM');
      monthlyData[month] = (monthlyData[month] || 0) + e.amount;
    });

    const chart = Object.entries(monthlyData).map(([name, total]) => ({ name, total }));

    return {
      totalOwed: owed,
      totalOwe: owe,
      totalBalance: balance,
      recentExpenses: expenses.slice(0, 5).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      chartData: chart,
    };
  }, [expenses, user]);

  const totalSpending = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's your expense overview
            </p>
          </div>
          <div className="flex gap-2">
            <CreateGroupDialog>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Create Group
              </Button>
            </CreateGroupDialog>
            <Link to="/groups">
              <Button size="lg" variant="outline" className="gap-2">
                View All Groups
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">You Are Owed</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₹{totalOwed.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Money others owe you
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">You Owe</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">₹{totalOwe.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Money you owe others
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
              <Wallet className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{Math.abs(totalBalance).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalBalance >= 0 ? 'You\'re owed' : 'You owe'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">₹{totalSpending.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {expenses.length} expenses
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Chart */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Monthly Spending</CardTitle>
              <CardDescription>Your expense trends over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Total
                                  </span>
                                  <span className="font-bold text-primary">
                                    ₹{payload[0].value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="total"
                      fill="currentColor"
                      radius={[8, 8, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentExpenses.length > 0 ? (
                  recentExpenses.map((expense) => {
                    const group = groups.find(g => g.id === expense.groupId);
                    return (
                      <div key={expense.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                          {expense.category === 'Food' ? '🍔' :
                            expense.category === 'Travel' ? '✈️' :
                              expense.category === 'Rent' ? '🏠' :
                                expense.category === 'Shopping' ? '🛍️' :
                                  expense.category === 'Entertainment' ? '🎬' :
                                    expense.category === 'Utilities' ? '💡' : '🧾'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{expense.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {group?.name || 'Unknown Group'} • {format(new Date(expense.date), 'MMM d')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">₹{expense.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ReceiptIcon className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                    <p className="text-sm font-medium mb-1">No expenses yet</p>
                    <p className="text-xs text-muted-foreground mb-4">Create a group and start tracking expenses!</p>
                    <CreateGroupDialog>
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Your First Group
                      </Button>
                    </CreateGroupDialog>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Link to="/groups">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{groups.length}</div>
                <p className="text-xs text-muted-foreground">Click to view all groups</p>
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <ReceiptIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expenses.length}</div>
              <p className="text-xs text-muted-foreground">Transactions recorded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Expense</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{expenses.length > 0 ? (totalSpending / expenses.length).toFixed(2) : '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">Per transaction</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
