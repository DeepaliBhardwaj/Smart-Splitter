import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useExpenseStore, Group } from "@/store/useExpenseStore";
import { toast } from "sonner";

interface AddExpenseDialogProps {
  group: Group;
  children: React.ReactNode;
}

export function AddExpenseDialog({ group, children }: AddExpenseDialogProps) {
  const { addExpense } = useExpenseStore();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [paidBy, setPaidBy] = useState(group.members[0]?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !paidBy) {
      toast.error("Please fill all fields", {
        duration: 3000,
      });
      return;
    }

    try {
      addExpense({
        groupId: group.id,
        title,
        amount: parseFloat(amount),
        paidBy,
        splitType: 'EQUAL',
        category: category as any,
        participants: group.members.map(m => m.id),
      });
      
      toast.success("Expense added!", {
        description: `${title} for $${amount} has been added.`,
        duration: 3000,
      });
      
      setOpen(false);
      setTitle("");
      setAmount("");
      setCategory("Other");
    } catch (error: any) {
      toast.error("Failed to add expense", {
        description: error.message,
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Expense</DialogTitle>
          <DialogDescription>
            Add a new expense to {group.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Description</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dinner, Taxi, etc."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pl-7"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">🍔 Food</SelectItem>
                <SelectItem value="Travel">✈️ Travel</SelectItem>
                <SelectItem value="Rent">🏠 Rent</SelectItem>
                <SelectItem value="Shopping">🛍️ Shopping</SelectItem>
                <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
                <SelectItem value="Utilities">💡 Utilities</SelectItem>
                <SelectItem value="Other">🧾 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paidBy">Paid By</Label>
            <Select value={paidBy} onValueChange={setPaidBy}>
              <SelectTrigger>
                <SelectValue placeholder="Select who paid" />
              </SelectTrigger>
              <SelectContent>
                {group.members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
