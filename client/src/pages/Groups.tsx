import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExpenseStore } from "@/store/useExpenseStore";
import { Plus, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Groups() {
  const { groups } = useExpenseStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
            <p className="text-muted-foreground">Manage your shared expenses</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Group
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Link key={group.id} to={`/groups/${group.id}`}>
             <Card className="hover-elevate transition-all cursor-pointer h-full border-l-4 border-l-primary/50 hover:border-l-primary">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
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
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                        ))}
                        {group.members.length > 4 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                                +{group.members.length - 4}
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="pt-2">
                    <p className="text-sm text-muted-foreground flex items-center">
                        View expenses <ArrowRight className="ml-1 h-3 w-3" />
                    </p>
                </CardFooter>
             </Card>
          </Link>
        ))}
        
        {/* Empty State / Add New */}
        <Button variant="outline" className="h-full min-h-[180px] border-dashed flex flex-col items-center justify-center gap-2 hover:bg-muted/50 hover:border-primary/50">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-lg font-medium text-muted-foreground">Create New Group</span>
        </Button>
      </div>
    </div>
  );
}