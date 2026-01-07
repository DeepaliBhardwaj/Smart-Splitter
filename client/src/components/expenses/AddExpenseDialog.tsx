import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useExpenseStore, Group } from "@/store/useExpenseStore";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { currencyAmountSchema, formatCurrency, restrictToCurrencyInput } from "@/lib/currencyValidation";

const formSchema = z.object({
  title: z.string().min(2, "Description must be at least 2 characters"),
  amount: currencyAmountSchema,
  category: z.enum(["Food", "Travel", "Rent", "Shopping", "Entertainment", "Utilities", "Other"]),
  paidBy: z.string().min(1, "Please select who paid"),
});

interface AddExpenseDialogProps {
  group: Group;
  children: React.ReactNode;
}

export function AddExpenseDialog({ group, children }: AddExpenseDialogProps) {
  const { addExpense } = useExpenseStore();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: "",
      category: "Other",
      paidBy: group.members[0]?.id || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      const amount = parseFloat(values.amount);
      
      addExpense({
        groupId: group.id,
        title: values.title,
        amount: amount,
        paidBy: values.paidBy,
        splitType: 'EQUAL',
        category: values.category as any,
        participants: group.members.map(m => m.id),
      });
      
      toast.success("Expense added!", {
        description: `${values.title} for ${formatCurrency(amount)} has been added.`,
        duration: 3000,
      });
      
      form.reset();
      setOpen(false);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Dinner, Taxi, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">₹</span>
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        max="10000000"
                        placeholder="0.00"
                        className="pl-7"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Restrict to valid currency format (max 2 decimals)
                          if (restrictToCurrencyInput(value)) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paidBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid By</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select who paid" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {group.members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                form.reset();
                setOpen(false);
              }}>
                Cancel
              </Button>
              <Button type="submit">Add Expense</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
