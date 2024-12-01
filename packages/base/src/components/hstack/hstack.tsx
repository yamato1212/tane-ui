"use client"

import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../../lib/utils"

const hstackVariants = cva(
  [
    "flex",
    "w-full",
  ].join(" "),
  {
    variants: {
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      wrap: {
        true: "flex-wrap",
        false: "flex-nowrap",
      },
      spacing: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
      },
    },
    defaultVariants: {
      align: "center",
      justify: "start",
      wrap: false,
      spacing: 4,
    }
  }
)

export interface HStackProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hstackVariants> {
  children: React.ReactNode;
  divider?: React.ReactNode;
  className?: string;
  responsive?: {
    spacing?: { sm?: number; md?: number; lg?: number };
    direction?: { sm?: 'row' | 'column'; md?: 'row' | 'column'; lg?: 'row' | 'column' };
  };
}

export const HStack = React.forwardRef<HTMLDivElement, HStackProps>(({ 
    children, 
    className,
    align,
    justify,
    wrap,
    spacing,
    divider,
    responsive,
    ...props 
}, ref): JSX.Element => {
    // dividerを含む子要素の配列を生成
    const childArray = React.Children.toArray(children);
    const childrenWithDividers = divider ? childArray.reduce<React.ReactNode[]>((acc, child, index) => {
      if (index === childArray.length - 1) {
        return [...acc, child];
      }
      return [...acc, child, React.cloneElement(divider as React.ReactElement, { 
        key: `divider-${index}` 
      })];
    }, []) : childArray;

    // レスポンシブクラスの生成
    const responsiveClasses = responsive ? [
      responsive.direction?.sm && `sm:flex-${responsive.direction.sm}`,
      responsive.direction?.md && `md:flex-${responsive.direction.md}`,
      responsive.direction?.lg && `lg:flex-${responsive.direction.lg}`,
      responsive.spacing?.sm && `sm:gap-${responsive.spacing.sm}`,
      responsive.spacing?.md && `md:gap-${responsive.spacing.md}`,
      responsive.spacing?.lg && `lg:gap-${responsive.spacing.lg}`,
    ].filter(Boolean).join(' ') : '';

    return (
      <div
        ref={ref}
        className={cn(
          hstackVariants({ align, justify, wrap, spacing }),
          responsiveClasses,
          className
        )}
        {...props}
      >
        {childrenWithDividers}
      </div>
    );
  }
);

HStack.displayName = "HStack";

export { hstackVariants };