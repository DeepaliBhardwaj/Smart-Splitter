import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useExpenseStore } from "@/store/useExpenseStore";
import { ArrowUpRight, ArrowDownLeft, Wallet, Activity } from "lucide-react";
import { format } from "date-fns";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useAuthStore } from "@/store/useAuthStore";
import { useMemo } from "react";

export default function Dashboard() {
  const { expenses } = useExpenseStore();
  const { user } = useAuthStore();

  const { totalOwed, totalOwe, totalBalance, recentExpenses, chartData } = useMemo(() => {
    let owed = 0;
    let owe = 0;
    const currentUserId = user?.id || user?._id;

    if (!currentUserId) return { totalOwed: 0, totalOwe: 0, totalBalance: 0, recentExpenses: [], chartData: [] };

    expenses.forEach(expense => {
      // Simplified Logic: assuming EQUAL split for now as per model default
      // If paid by me, others owe me
      if (expense.paidBy === currentUserId) {
        const share = expense.amount / (expense.participants.length || 1);
        // I paid, so everyone else owes me their share
        // If I am not in participants, they owe me full amount? No, usually I am participant too.
        // Let's assume I am in participants if I paid for a shared expense.
        // number of OTHER participants = total participants - 1 (me)
        // If I am NOT in participants but paid, they owe me everything.
        const amIParticipant = expense.participants.includes(currentUserId);
        const othersCount = expense.participants.length - (amIParticipant ? 1 : 0);
        owed += share * othersCount;
      } else if (expense.participants.includes(currentUserId)) {
        // Paid by someone else, and I am involved
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
      recentExpenses: [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5),
      chartData: chart
    };

  }, [expenses, user]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-elevate transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalBalance >= 0 ? '+' : '-'}${Math.abs(totalBalance).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Overall across all groups
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">You are owed</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+${totalOwed.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From friends
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">You owe</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">-${totalOwe.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              To friends
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover-elevate transition-all">
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
            <CardDescription>
              Your monthly expense activity
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
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
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar
                  dataKey="total"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 hover-elevate transition-all">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentExpenses.length === 0 ? <p className="text-muted-foreground text-sm">No recent activity</p> :
                recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{expense.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {expense.paidBy === (user?.id || user?._id) ? 'You' : 'Someone'} paid ${expense.amount}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-muted-foreground">
                      {format(new Date(expense.date), 'MMM d')}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}