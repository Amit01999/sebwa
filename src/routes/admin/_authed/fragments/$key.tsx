import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { fragmentQueryOptions } from "@/lib/admin/queries";
import { api } from "@/lib/admin/api-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SaveBar } from "@/components/admin/shared/SaveBar";

export const Route = createFileRoute("/admin/_authed/fragments/$key")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(fragmentQueryOptions(params.key));
  },
  component: FragmentDetailPage,
});

type FragmentData = {
  columns: string[];
  rows: { program: string; values: (boolean | string)[] }[];
};

function FragmentDetailPage() {
  const { key } = Route.useParams();
  const { data } = useSuspenseQuery(fragmentQueryOptions(key));
  const [value, setValue] = useState<FragmentData>(data.fragment.data);
  const queryClient = useQueryClient();

  const save = useMutation({
    mutationFn: () => api.put(`/api/admin/fragments/${key}`, { type: "courseTable", data: value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "fragments"] });
      toast.success("Fragment saved");
    },
    onError: () => toast.error("Could not save fragment"),
  });

  const addColumn = () =>
    setValue((v) => ({
      columns: [...v.columns, `Column ${v.columns.length + 1}`],
      rows: v.rows.map((r) => ({ ...r, values: [...r.values, false] })),
    }));
  const removeColumn = (colIndex: number) =>
    setValue((v) => ({
      columns: v.columns.filter((_, i) => i !== colIndex),
      rows: v.rows.map((r) => ({ ...r, values: r.values.filter((_, i) => i !== colIndex) })),
    }));
  const addRow = () =>
    setValue((v) => ({
      ...v,
      rows: [...v.rows, { program: "", values: v.columns.map(() => false) }],
    }));
  const removeRow = (rowIndex: number) =>
    setValue((v) => ({ ...v, rows: v.rows.filter((_, i) => i !== rowIndex) }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{key}</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-border p-1 text-left">Program</th>
              {value.columns.map((col, colIndex) => (
                <th key={colIndex} className="border border-border p-1">
                  <div className="flex items-center gap-1">
                    <Input
                      value={col}
                      className="h-7"
                      onChange={(e) =>
                        setValue((v) => ({
                          ...v,
                          columns: v.columns.map((c, i) => (i === colIndex ? e.target.value : c)),
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeColumn(colIndex)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </th>
              ))}
              <th className="border-0" />
            </tr>
          </thead>
          <tbody>
            {value.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-border p-1">
                  <Input
                    value={row.program}
                    className="h-7"
                    onChange={(e) =>
                      setValue((v) => ({
                        ...v,
                        rows: v.rows.map((r, i) =>
                          i === rowIndex ? { ...r, program: e.target.value } : r,
                        ),
                      }))
                    }
                  />
                </td>
                {row.values.map((cell, colIndex) => (
                  <td key={colIndex} className="border border-border p-1 text-center">
                    {typeof cell === "boolean" ? (
                      <Checkbox
                        checked={cell}
                        onCheckedChange={(checked) =>
                          setValue((v) => ({
                            ...v,
                            rows: v.rows.map((r, ri) =>
                              ri === rowIndex
                                ? {
                                    ...r,
                                    values: r.values.map((val, ci) =>
                                      ci === colIndex ? !!checked : val,
                                    ),
                                  }
                                : r,
                            ),
                          }))
                        }
                      />
                    ) : (
                      <Input
                        value={cell}
                        className="h-7"
                        onChange={(e) =>
                          setValue((v) => ({
                            ...v,
                            rows: v.rows.map((r, ri) =>
                              ri === rowIndex
                                ? {
                                    ...r,
                                    values: r.values.map((val, ci) =>
                                      ci === colIndex ? e.target.value : val,
                                    ),
                                  }
                                : r,
                            ),
                          }))
                        }
                      />
                    )}
                  </td>
                ))}
                <td className="border-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(rowIndex)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={addColumn}>
          <Plus className="h-3.5 w-3.5" /> Column
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={addRow}>
          <Plus className="h-3.5 w-3.5" /> Row
        </Button>
      </div>

      <SaveBar onSave={() => save.mutate()} saving={save.isPending} />
    </div>
  );
}
