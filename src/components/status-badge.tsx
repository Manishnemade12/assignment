import { Badge } from "@/components/ui/badge";
import { type TrackStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: TrackStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusColors: Record<TrackStatus, string> = {
    Published: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
    Draft: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
    Submitted: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800",
  };

  return (
    <Badge
      variant="outline"
      className={cn("font-medium", statusColors[status])}
    >
      {status}
    </Badge>
  );
}
