import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useExpenseStore } from "@/store/useExpenseStore";
import { AppLayout } from "@/components/layout/AppLayout";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Analytics() {
  const { expenses } = useExpenseStore();

  // Aggregate by category
  const categoryData = expenses.reduce((acc: any[], expense) => {
    const existing = acc.find(item => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  // Aggregate by user (mock)
  const spendingByUserData = [
    { name: 'You', value: 1200 },
    { name: 'Sarah', value: 900 },
    { name: 'Mike', value: 1600 },
    { name: 'Emily', value: 600 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Where does your money go?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle>Group Spending</CardTitle>
            <CardDescription>Who spends the most?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingByUserData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                    {spendingByUserData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Smart recommendations based on your spending</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-1">High Travel Expenses</h4>
                    <p className="text-sm text-muted-foreground">
                        Your travel expenses are 40% higher than last month. Consider booking flights earlier for your next trip to Bali.
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-muted border">
                    <h4 className="font-semibold mb-1">Settlement Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                        You owe Sarah $50 and she owes Mike $50. You can pay Mike directly to simplify the debt chain.
                    </p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
    </AppLayout>
  );
}