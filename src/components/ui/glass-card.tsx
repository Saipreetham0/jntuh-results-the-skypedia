import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.ComponentProps<typeof Card> {
    variant?: "default" | "dark" | "gradient";
}

export function GlassCard({ className, variant = "default", ...props }: GlassCardProps) {
    return (
        <Card
            className={cn(
                "rounded-3xl border border-white/20 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-xl transition-all duration-300",
                variant === "dark" && "bg-black/60 dark:bg-black/60 border-white/10",
                variant === "gradient" && "bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 border-white/30 dark:border-white/10",
                className
            )}
            {...props}
        />
    );
}
