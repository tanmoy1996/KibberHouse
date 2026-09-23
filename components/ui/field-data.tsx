import { cn } from "@/lib/utils/cn";
type FieldDataProps = {
  label: string;
  value: string | number;
  className?: string;
};
export function FieldData({ label, value, className }: FieldDataProps) {
  return (
    <dl className={cn("field-data", className)}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
}
