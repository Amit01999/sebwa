import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { meQueryOptions } from "@/lib/admin/queries";
import { api, ApiError } from "@/lib/admin/api-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const Route = createFileRoute("/admin/_authed/profile")({
  component: ProfilePage,
});

const profileSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .refine((v) => !v.newPassword || v.newPassword.length >= 8, {
    message: "New password must be at least 8 characters",
    path: ["newPassword"],
  })
  .refine((v) => !v.newPassword || !!v.currentPassword, {
    message: "Enter your current password to set a new one",
    path: ["currentPassword"],
  });

function ProfilePage() {
  const { data } = useSuspenseQuery(meQueryOptions());
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: data.user.name, currentPassword: "", newPassword: "" },
  });

  const updateProfile = useMutation({
    mutationFn: (values: z.infer<typeof profileSchema>) =>
      api.patch("/api/admin/auth/profile", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "me"] });
      toast.success("Profile updated");
      form.resetField("currentPassword");
      form.resetField("newPassword");
    },
    onError: (error) =>
      toast.error(error instanceof ApiError ? error.message : "Could not update profile"),
  });

  return (
    <div className="max-w-sm space-y-4">
      <h1 className="text-xl font-semibold">Your profile</h1>
      <p className="text-sm text-muted-foreground">{data.user.email}</p>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) => updateProfile.mutate(values))}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password (optional)</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Saving…" : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
