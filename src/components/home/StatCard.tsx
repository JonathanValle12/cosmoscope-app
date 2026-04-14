import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: IconType;
  iconClassName?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClassName,
  className,
}: StatCardProps) {
  return (
    <article
      className={cn(
        "rounded-3xl mt-7 border border-white/10 bg-[#03060B] px-5 py-4 transition-colors hover:border-blue-300",
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10">
          <Icon className={cn("h-5 w-5 text-cyan-400", iconClassName)} />
        </div>

        <span className="text-[15px] font-medium text-white/60">{title}</span>
      </div>

      <div className="text-2xl font-semibold tracking-tight text-white md:text-[1.9rem]">
        {value}
      </div>

      {subtitle && (
        <p className="text-[14px] text-white/50">{subtitle}</p>
      )}
    </article>
  );
}