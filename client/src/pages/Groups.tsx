import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExpenseStore } from "@/store/useExpenseStore";
import { Plus, Users, ArrowRight, Trash2, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateGroupDialog } from "@/components/groups/CreateGroupDialog";
import { DeleteGroupDialog } from "@/components/groups/DeleteGroupDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppLayout } from "@/components/layout/AppLayout";

export default function Groups() {
  const { groups } = useExpenseStore();

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
            <p className="text-muted-foreground">Manage your shared expenses</p>
          </div>
          <CreateGroupDialog>
            <Button size="lg">
              <Plus className="mr-2 h-4 w-4" /> Create Group
            </Button>
          </CreateGroupDialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.id} className="group hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-primary/50 hover:border-l-primary relative overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DeleteGroupDialog groupId={group.id} groupName={group.name}>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive cursor-pointer">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Group
                      </DropdownMenuItem>
                    </DeleteGroupDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Link to={`/groups/${group.id}`}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start pr-8">
                    <div>
                      <CardTitle className="text-xl">{group.name}</CardTitle>
                      <CardDescription className="mt-1">{group.type}</CardDescription>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex -space-x-2 overflow-hidden">
                    {group.members.slice(0, 4).map((member) => (
                      <Avatar key={member.id} className="inline-block border-2 border-background h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ))}
                    {group.members.length > 4 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                        +{group.members.length - 4}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                  </p>
                </CardContent>
                <CardFooter className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground flex items-center group-hover:text-primary transition-colors">
                    View expenses <ArrowRight className="ml-1 h-3 w-3" />
                  </p>
                </CardFooter>
              </Link>
            </Card>
          ))}

          {/* Empty State / Add New */}
          <CreateGroupDialog>
            <Card className="h-full min-h-[240px] border-dashed border-2 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-muted-foreground">Create New Group</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Start tracking expenses</p>
              </div>
            </Card>
          </CreateGroupDialog>
        </div>

        {groups.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">No groups yet</h3>
                <p className="text-muted-foreground mb-4">Create your first group to start splitting expenses</p>
                <CreateGroupDialog>
                  <Button size="lg">
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Group
                  </Button>
                </CreateGroupDialog>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
