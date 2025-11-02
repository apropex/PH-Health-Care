import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonTypes } from "./button.type";

interface iProps extends ButtonTypes {
  isLoading: boolean;
  loadingText: string;
}

export default function LoadingButton({
  children,
  className,
  variant,
  size,
  asChild = false,
  icon: Icon,
  iconClass,
  iconRight = false,
  isLoading,
  loadingText,
  ...props
}: iProps) {
  return (
    <Button
      className={cn(className)}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    >
      {isLoading ? (
        <>
          <span>
            <Loader className={cn("animate-spin", iconClass)} />
          </span>
          <span className="inline-block mt-1">{loadingText}</span>
        </>
      ) : (
        <>
          {Icon && !iconRight && <Icon className={iconClass} />}
          <span className="inline-block mt-1">{children}</span>
          {Icon && iconRight && <Icon className={iconClass} />}
        </>
      )}
    </Button>
  );
}
