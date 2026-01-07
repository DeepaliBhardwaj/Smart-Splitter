import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useExpenseStore } from "@/store/useExpenseStore";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Group name must be at least 2 characters"),
  type: z.enum(["Trip", "Home", "Couple", "Other"]),
  currency: z.string().default("$"),
});

interface CreateGroupDialogProps {
  children: React.ReactNode;
}

export function CreateGroupDialog({ children }: CreateGroupDialogProps) {
  const [open, setOpen] = useState(false);
  const { createGroup } = useExpenseStore();
  const { user } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "Other",
      currency: "$",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    
    try {
      createGroup({
        name: values.name,
        type: values.type,
        currency: values.currency,
        members: [user],
      });
      
      toast.success("Group created!", {
        description: `${values.name} has been created successfully.`,
        duration: 3000,
      });
      
      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast.error("Failed to create group", {
        description: error.message,
        duration: 3000,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Group</DialogTitle>
          <DialogDescription>
            Create a group to start tracking shared expenses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Weekend Trip" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Trip">Trip</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Couple">Couple</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input placeholder="$" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Group</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

