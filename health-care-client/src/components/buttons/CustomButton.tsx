import { Button } from "../ui/button";
import { ButtonTypes } from "./button.type";

export default function CustomButton({
  children,
  className,
  variant,
  size,
  asChild = false,
  icon: Icon,
  iconClass,
  iconRight = false,
  ...props
}: ButtonTypes) {
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    >
      {Icon && !iconRight && <Icon className={iconClass} />}
      <span className="inline-block mt-1">{children}</span>
      {Icon && iconRight && <Icon className={iconClass} />}
    </Button>
  );
}
