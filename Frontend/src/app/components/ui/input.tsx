import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400",
        className
      )}
      {...props}
    />
  );
}
