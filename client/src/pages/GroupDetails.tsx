import { useParams, useNavigate } from "react-router-dom";
import { useExpenseStore } from "@/store/useExpenseStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Receipt, TrendingUp, Users, ArrowLeft, Trash2, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { DeleteExpenseDialog } from "@/components/expenses/DeleteExpenseDialog";
import { DeleteGroupDialog } from "@/components/groups/DeleteGroupDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppLayout } from "@/components/layout/AppLayout";

export default function GroupDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { groups, expenses } = useExpenseStore();

    const group = groups.find(g => g.id === id);
    const groupExpenses = expenses.filter(e => e.groupId === id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!group) {
        return (
            <AppLayout>
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <p className="text-lg text-muted-foreground mb-4">Group not found</p>
                    <Button onClick={() => navigate("/groups")}>Back to Groups</Button>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex flex-col gap-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate("/groups")} className="w-fit">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Groups
                    </Button>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                                {group.name}
                                <span className="text-sm font-normal text-muted-foreground px-3 py-1 bg-muted rounded-full">{group.type}</span>
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-2 mt-2">
                                <Users className="h-4 w-4" /> {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <AddExpenseDialog group={group}>
                                <Button size="lg">
                                    <Plus className="mr-2 h-4 w-4" /> Add Expense
                                </Button>
                            </AddExpenseDialog>
                            <DeleteGroupDialog groupId={group.id} groupName={group.name}>
                                <Button variant="destructive" size="lg">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Group
                                </Button>
                            </DeleteGroupDialog>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="md:col-span-2 space-y-6">
                        <Tabs defaultValue="expenses" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                                <TabsTrigger value="balances">Balances</TabsTrigger>
                            </TabsList>
                            <TabsContent value="expenses" className="space-y-4 mt-6">
                                {groupExpenses.length === 0 ? (
                                    <Card className="p-12">
                                        <div className="text-center">
                                            <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                                            <p className="text-lg font-medium mb-2">No expenses yet</p>
                                            <p className="text-muted-foreground mb-4">Add your first expense to get started!</p>
                                            <AddExpenseDialog group={group}>
                                                <Button>
                                                    <Plus className="mr-2 h-4 w-4" /> Add Expense
                                                </Button>
                                            </AddExpenseDialog>
                                        </div>
                                    </Card>
                                ) : (
                                    groupExpenses.map(expense => {
                                        const payer = group.members.find(m => m.id === expense.paidBy);
                                        return (
                                            <Card key={expense.id} className="hover:bg-muted/30 transition-colors group">
                                                <CardContent className="p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                                                            {expense.category === 'Food' ? '🍔' :
                                                                expense.category === 'Travel' ? '✈️' :
                                                                    expense.category === 'Rent' ? '🏠' :
                                                                        expense.category === 'Shopping' ? '🛍️' :
                                                                            expense.category === 'Entertainment' ? '🎬' :
                                                                                expense.category === 'Utilities' ? '💡' :
                                                                                    '🧾'}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-semibold text-lg">{expense.title}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {payer?.name || 'Unknown'} paid • {expense.category}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-right">
                                                            <div className="font-bold text-xl text-primary">
                                                                ₹{expense.amount.toFixed(2)}
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">
                                                                {format(new Date(expense.date), 'MMM d, yyyy')}
                                                            </p>
                                                        </div>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DeleteExpenseDialog expenseId={expense.id} expenseTitle={expense.title}>
                                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive cursor-pointer">
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DeleteExpenseDialog>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })
                                )}
                            </TabsContent>
                            <TabsContent value="balances" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Group Balances</CardTitle>
                                        <CardDescription>Who owes whom</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {group.members.map(member => {
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
                                                
                                                return (
                                                    <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-10 w-10">
                                                                <AvatarImage src={member.avatar} />
                                                                <AvatarFallback>{member.name[0].toUpperCase()}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <span className="font-medium">{member.name}</span>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Paid: ₹{paid.toFixed(2)} • Share: ₹{share.toFixed(2)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className={`font-bold text-lg ${net > 0 ? 'text-green-600' : net < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                                                            {Math.abs(net) < 0.01 ? 'Settled' : net > 0 ? `+₹${net.toFixed(2)}` : `-₹${Math.abs(net).toFixed(2)}`}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Members</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px] pr-4">
                                    <div className="space-y-3">
                                        {group.members.map(member => (
                                            <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={member.avatar} />
                                                    <AvatarFallback>{member.name[0].toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" /> Total Spending
                                </CardTitle>
                            </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold mb-2">
                                ₹{groupExpenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
                            </div>
                                <p className="text-primary-foreground/80 text-sm">
                                    Across {groupExpenses.length} {groupExpenses.length === 1 ? 'expense' : 'expenses'}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
