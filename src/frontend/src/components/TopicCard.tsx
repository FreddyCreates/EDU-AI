import type { Topic } from "@/backend";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

interface TopicCardProps {
  topic: Topic;
  onStart?: (topic: Topic) => void;
  className?: string;
  index?: number;
}

export function TopicCard({
  topic,
  onStart,
  className,
  index = 1,
}: TopicCardProps) {
  return (
    <div
      data-ocid={`topic.card.${index}`}
      className={cn(
        "group glass glass-shimmer rounded-2xl overflow-hidden",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40",
        className,
      )}
    >
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          {/* Topic icon */}
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-sm",
              "text-primary transition-all duration-200 group-hover:scale-105",
            )}
          >
            <BookOpen className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-1">
              {topic.title}
            </h3>
            {topic.description && (
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {topic.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>~15 min</span>
          </div>

          <Button
            data-ocid={`topic.start_button.${index}`}
            size="sm"
            className={cn(
              "gap-1.5 text-xs font-semibold h-8 px-3",
              "bg-primary/15 border border-primary/30 text-primary",
              "hover:bg-primary/25 hover:border-primary/50 transition-smooth",
            )}
            onClick={() => onStart?.(topic)}
            type="button"
          >
            Start Learning
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Progress accent at bottom */}
      <div className="h-px w-full bg-gradient-to-r from-primary/40 via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
