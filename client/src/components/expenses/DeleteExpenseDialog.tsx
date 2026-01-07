import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useExpenseStore } from "@/store/useExpenseStore";
import { toast } from "sonner";

interface DeleteExpenseDialogProps {
  expenseId: string;
  expenseTitle: string;
  children: React.ReactNode;
}

export function DeleteExpenseDialog({ expenseId, expenseTitle, children }: DeleteExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const { deleteExpense } = useExpenseStore();

  const handleDelete = () => {
    try {
      deleteExpense(expenseId);
      toast.success("Expense deleted", {
        description: `${expenseTitle} has been deleted successfully.`,
        duration: 3000,
      });
      setOpen(false);
    } catch (error: any) {
      toast.error("Failed to delete expense", {
        description: error.message,
        duration: 3000,
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the expense "<strong>{expenseTitle}</strong>".
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

