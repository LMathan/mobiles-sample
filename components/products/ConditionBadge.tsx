import React from "react";
import { ProductCondition } from "@/types";
import { getConditionBadgeStyle } from "@/lib/utils";

interface ConditionBadgeProps {
  condition: ProductCondition;
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
}

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({
  condition,
  size = "md",
  showDot = true,
}) => {
  const style = getConditionBadgeStyle(condition);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] tracking-wider",
    md: "px-2.5 py-1 text-xs tracking-wider",
    lg: "px-3 py-1.5 text-xs tracking-widest font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold uppercase ${style.bg} ${sizeClasses[size]}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />}
      <span>{style.label}</span>
    </span>
  );
};
