import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { api } from "@/lib/admin/api-client";
import type { NavigationMenu, NavItem, NavChild } from "@/lib/admin/queries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SaveBar } from "@/components/admin/shared/SaveBar";

export function NavMenuEditor({ navigation }: { navigation: NavigationMenu }) {
  const [items, setItems] = useState<NavItem[]>(navigation.items);
  const [ctaButton, setCtaButton] = useState(navigation.ctaButton);
  const queryClient = useQueryClient();

  const save = useMutation({
    mutationFn: () => api.put("/api/admin/navigation", { items, ctaButton }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "navigation"] });
      toast.success("Navigation saved");
    },
    onError: () => toast.error("Could not save navigation"),
  });

  const updateItem = (index: number, patch: Partial<NavItem>) =>
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const moveItem = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((item, i) => ({ ...item, order: i }));
    });
  };
  const updateChild = (itemIndex: number, childIndex: number, patch: Partial<NavChild>) =>
    updateItem(itemIndex, {
      children: items[itemIndex].children.map((c, i) =>
        i === childIndex ? { ...c, ...patch } : c,
      ),
    });

  return (
    <div className="space-y-4">
      {items.map((item, itemIndex) => (
        <div key={itemIndex} className="space-y-3 rounded-md border border-border p-3">
          <div className="flex items-center gap-2">
            <Input
              value={item.label}
              placeholder="Label"
              onChange={(e) => updateItem(itemIndex, { label: e.target.value })}
            />
            <Input
              value={item.to}
              placeholder="/path"
              onChange={(e) => updateItem(itemIndex, { to: e.target.value })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => moveItem(itemIndex, -1)}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => moveItem(itemIndex, 1)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => setItems((prev) => prev.filter((_, i) => i !== itemIndex))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 pl-6">
            {item.children.map((child, childIndex) => (
              <div key={childIndex} className="flex items-center gap-2">
                <Input
                  value={child.label}
                  placeholder="Label"
                  onChange={(e) => updateChild(itemIndex, childIndex, { label: e.target.value })}
                />
                <Input
                  value={child.to}
                  placeholder="/path"
                  onChange={(e) => updateChild(itemIndex, childIndex, { to: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    updateItem(itemIndex, {
                      children: item.children.filter((_, i) => i !== childIndex),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                updateItem(itemIndex, {
                  children: [...item.children, { label: "", to: "", order: item.children.length }],
                })
              }
            >
              <Plus className="h-3.5 w-3.5" /> Add submenu item
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          setItems((prev) => [...prev, { label: "", to: "", order: prev.length, children: [] }])
        }
      >
        <Plus className="h-4 w-4" /> Add menu item
      </Button>

      <div className="rounded-md border border-border p-3">
        <Label className="mb-2 block text-sm font-medium">Contact CTA button</Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={ctaButton.label}
            placeholder="Label"
            onChange={(e) => setCtaButton({ ...ctaButton, label: e.target.value })}
          />
          <Input
            value={ctaButton.to}
            placeholder="/path"
            onChange={(e) => setCtaButton({ ...ctaButton, to: e.target.value })}
          />
        </div>
      </div>

      <SaveBar onSave={() => save.mutate()} saving={save.isPending} />
    </div>
  );
}
