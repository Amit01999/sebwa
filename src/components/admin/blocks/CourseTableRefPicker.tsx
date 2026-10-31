import { useQuery } from "@tanstack/react-query";
import { fragmentsQueryOptions } from "@/lib/admin/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CourseTableRefPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (fragmentKey: string) => void;
}) {
  const { data, isLoading } = useQuery(fragmentsQueryOptions());

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={isLoading ? "Loading…" : "Choose a shared table"} />
      </SelectTrigger>
      <SelectContent>
        {data?.fragments.map((fragment) => (
          <SelectItem key={fragment.key} value={fragment.key}>
            {fragment.key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
