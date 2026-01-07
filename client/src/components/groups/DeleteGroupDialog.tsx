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

interface DeleteGroupDialogProps {
  groupId: string;
  groupName: string;
  children: React.ReactNode;
}

export function DeleteGroupDialog({ groupId, groupName, children }: DeleteGroupDialogProps) {
  const [open, setOpen] = useState(false);
  const { deleteGroup } = useExpenseStore();

  const handleDelete = () => {
    try {
      deleteGroup(groupId);
      toast.success("Group deleted", {
        description: `${groupName} has been deleted successfully.`,
        duration: 3000,
      });
      setOpen(false);
    } catch (error: any) {
      toast.error("Failed to delete group", {
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
            This will permanently delete the group "<strong>{groupName}</strong>" and all its expenses.
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

