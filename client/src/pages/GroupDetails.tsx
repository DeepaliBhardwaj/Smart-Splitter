import { useParams } from "react-router-dom";
import { useExpenseStore } from "@/store/useExpenseStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Receipt, TrendingUp, Users, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GroupDetails() {
    const { id } = useParams();
    const { groups, expenses } = useExpenseStore();

    const group = groups.find(g => g.id === id);
    const groupExpenses = expenses.filter(e => e.groupId === id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!group) return <div>Group not found</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        {group.name}
                        <span className="text-xs font-normal text-muted-foreground px-2 py-1 bg-muted rounded-full">{group.type}</span>
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <Users className="h-4 w-4" /> {group.members.length} members
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" /> Chat
                    </Button>
                    <Button variant="secondary">
                        Settle Up
                    </Button>
                    <AddExpenseDialog group={group}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Expense
                        </Button>
                    </AddExpenseDialog>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-6">
                    <Tabs defaultValue="expenses">
                        <TabsList>
                            <TabsTrigger value="expenses">Expenses</TabsTrigger>
                            <TabsTrigger value="balances">Balances</TabsTrigger>
                            <TabsTrigger value="totals">Totals</TabsTrigger>
                        </TabsList>
                        <TabsContent value="expenses" className="space-y-4 mt-4">
                            {groupExpenses.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Receipt className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p>No expenses yet. Add one to get started!</p>
                                </div>
                            ) : (
                                groupExpenses.map(expense => (
                                    <Card key={expense.id} className="hover:bg-muted/5 transition-colors">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                                                    {expense.category === 'Food' ? '🍔' :
                                                        expense.category === 'Travel' ? '✈️' :
                                                            expense.category === 'Rent' ? '🏠' :
                                                                '🧾'}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{expense.title}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {group.members.find(m => m.id === expense.paidBy)?.name} paid ${expense.amount}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-amount">
                                                    ${expense.amount}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {format(new Date(expense.date), 'MMM d')}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </TabsContent>
                        <TabsContent value="balances">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Group Balances</CardTitle>
                                    <CardDescription>Who owes whom (Simplified Logic)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {group.members.map(member => {
                                            // Calculate net balance for this member
                                            let paid = 0;
                                            let share = 0;

                                            groupExpenses.forEach(e => {
                                                if (e.paidBy === member.id) {
                                                    paid += e.amount;
                                                }
                                                if (e.participants.includes(member.id)) {
                                                    share += e.amount / e.participants.length;
                                                }
                                            });

                                            const net = paid - share;
                                            if (Math.abs(net) < 0.01) return null; // Hide if settled

                                            return (
                                                <div key={member.id} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={member.avatar} />
                                                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-sm font-medium">{member.name}</span>
                                                    </div>
                                                    <span className={`font-medium text-sm ${net > 0 ? 'text-success' : 'text-destructive'}`}>
                                                        {net > 0 ? `gets back $${net.toFixed(2)}` : `owes $${Math.abs(net).toFixed(2)}`}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                        {group.members.length === 0 && <p className="text-muted-foreground">No members in this group.</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar Area */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-4">
                                    {group.members.map(member => (
                                        <div key={member.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={member.avatar} />
                                                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground">Member</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" /> Total Spending
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                ${groupExpenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
                            </div>
                            <p className="text-primary-foreground/80 text-sm mt-2">
                                Across {groupExpenses.length} expenses
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}