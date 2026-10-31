import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { submissionsQueryOptions, type SubmissionsListParams } from "@/lib/admin/queries";
import { downloadFile } from "@/lib/admin/api-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  in_progress: "In progress",
  resolved: "Resolved",
};
const STATUS_VARIANTS: Record<string, "default" | "secondary" | "outline"> = {
  new: "default",
  in_progress: "secondary",
  resolved: "outline",
};

export function SubmissionsTable() {
  const [params, setParams] = useState<SubmissionsListParams>({
    page: 1,
    limit: 20,
    sort: "newest",
  });
  const { data, isLoading } = useQuery(submissionsQueryOptions(params));
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search name, email, reference…"
          className="max-w-xs"
          onChange={(e) => setParams((p) => ({ ...p, search: e.target.value, page: 1 }))}
        />
        <Select
          value={params.status ?? "all"}
          onValueChange={(v) =>
            setParams((p) => ({
              ...p,
              status: v === "all" ? undefined : (v as SubmissionsListParams["status"]),
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={params.formType ?? "all"}
          onValueChange={(v) =>
            setParams((p) => ({
              ...p,
              formType: v === "all" ? undefined : (v as SubmissionsListParams["formType"]),
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Form type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All forms</SelectItem>
            <SelectItem value="contact">Contact</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const qs = new URLSearchParams();
            if (params.status) qs.set("status", params.status);
            if (params.formType) qs.set("formType", params.formType);
            if (params.search) qs.set("search", params.search);
            downloadFile(`/api/admin/submissions/export?${qs.toString()}`, "submissions.csv");
          }}
        >
          <Download className="h-3.5 w-3.5" /> Export CSV
        </Button>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Form</TableHead>
            <TableHead>Page</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Received</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <Link
                  to="/admin/submissions/$id"
                  params={{ id: item._id }}
                  className="font-medium text-primary hover:underline"
                >
                  {item.referenceId}
                </Link>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="capitalize">{item.formType}</TableCell>
              <TableCell>{item.pageSlug}</TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANTS[item.status]}>{STATUS_LABELS[item.status]}</Badge>
              </TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data && data.items.length === 0 && !isLoading && (
        <p className="text-sm text-muted-foreground">No submissions match these filters.</p>
      )}

      {data && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={(params.page ?? 1) <= 1}
            onClick={() => setParams((p) => ({ ...p, page: (p.page ?? 1) - 1 }))}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {params.page ?? 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={(params.page ?? 1) >= totalPages}
            onClick={() => setParams((p) => ({ ...p, page: (p.page ?? 1) + 1 }))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
