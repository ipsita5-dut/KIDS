import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

interface SelectItemProps extends SelectHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: ReactNode;
}

export function SelectItem({ value, children, ...props }: SelectItemProps) {
  return <option value={value} {...props}>{children}</option>;
}
