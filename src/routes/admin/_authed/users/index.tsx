import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { usersQueryOptions } from "@/lib/admin/queries";
import { api, ApiError } from "@/lib/admin/api-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/_authed/users/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions());
  },
  component: UsersPage,
});

function UsersPage() {
  const { data } = useSuspenseQuery(usersQueryOptions());
  const queryClient = useQueryClient();

  const toggleActive = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      api.patch(`/api/admin/users/${id}`, { isActive }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
    onError: (error) =>
      toast.error(error instanceof ApiError ? error.message : "Could not update admin"),
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("Admin removed");
    },
    onError: (error) =>
      toast.error(error instanceof ApiError ? error.message : "Could not delete admin"),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Admin users</h1>
        <Button asChild>
          <Link to="/admin/users/new">
            <Plus className="h-4 w-4" /> New admin
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Last login</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Switch
                  checked={user.isActive}
                  onCheckedChange={(isActive) => toggleActive.mutate({ id: user._id, isActive })}
                />
              </TableCell>
              <TableCell>
                {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Never"}
              </TableCell>
              <TableCell>
                <ConfirmDialog
                  trigger={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                  title="Delete this admin account?"
                  onConfirm={() => deleteUser.mutate(user._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
