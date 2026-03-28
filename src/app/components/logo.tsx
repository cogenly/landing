import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

const logoVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "gap-1.5",
      sm: "gap-1",
      lg: "gap-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const logoImageVariants = cva("", {
  variants: {
    size: {
      default: "size-[22px]",
      sm: "size-[18px]",
      lg: "size-[28px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const logoNameVariants = cva("tracking-tighter", {
  variants: {
    size: {
      default: "text-xl font-bold",
      sm: "text-base font-bold",
      lg: "text-2xl font-bold",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export function Logo({
  size,
  className,
  invert,
}: {
  size?: VariantProps<typeof logoVariants>["size"];
  className?: string;
  invert?: boolean;
} = {}) {
  return (
    <div className={logoVariants({ size, className })}>
      <Image
        src="/logo.png"
        alt="Cogenly"
        width={28}
        height={28}
        className={`${logoImageVariants({ size })}${invert ? " brightness-0 invert" : ""}`}
      />
      <span className={logoNameVariants({ size })}>cogenly</span>
    </div>
  );
}
