"use client"

import { cva, type VariantProps } from "class-variance-authority"

import React, { useEffect, useId, useRef, useState } from "react"
import { cn } from "../../lib/utils";

const buttonVariants = cva(
    [
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
      "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      "relative overflow-hidden",
      "border-2",
    ].join(" "),
    {
      variants: {
        variant: {
          default: [
            "bg-primary/60 text-primary-foreground shadow hover:bg-primary/90",
            "border-primary/70",
          ].join(" "),
          destructive: [
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            "border-destructive/70",
          ].join(" "),
          outline: [
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            "border-input/70",
          ].join(" "),
          secondary: [
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            "border-secondary/70",
          ].join(" "),
          ghost: [
            "hover:bg-accent hover:text-accent-foreground",
            "border-transparent",
          ].join(" "),
          link: [
            "text-primary underline-offset-4 hover:underline",
            "border-transparent",
          ].join(" "),
        },
        size: {
          // レスポンシブ対応のサイズ
          default: [
            // モバイル
            "h-8 px-3 py-1.5 text-sm",
            // タブレット
            "sm:h-9 sm:px-4 sm:py-2",
            // デスクトップ
            "lg:h-10 lg:px-5 lg:py-2.5",
          ].join(" "),
          sm: [
            "h-7 px-2.5 py-1 text-xs",
            "sm:h-8 sm:px-3 sm:py-1.5",
            "lg:h-9 lg:px-4 lg:py-2",
          ].join(" "),
          lg: [
            "h-9 px-4 py-2 text-base",
            "sm:h-10 sm:px-5 sm:py-2.5",
            "lg:h-11 lg:px-6 lg:py-3 lg:text-lg",
          ].join(" "),
          icon: [
            "h-8 w-8",
            "sm:h-9 sm:w-9",
            "lg:h-10 lg:w-10",
          ].join(" "),
        },
        animation: {
            none: "",
            bounce: "hover:animate-bounce",
            pulse: "hover:animate-pulse",
            shake: "animate-shake",
            slideIn: "animate-slideIn",
            fadeIn: "animate-fadeIn",
          }
      },
      defaultVariants: {
        variant: "default",
        size: "default"
      }
    }
  )

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  // アクセシビリティ
  ariaLabel?: string;
  
  // ローディング状態
  loading?: boolean;
  loadingText?: string;
  
  // アイコン
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  // スケルトン
  skeleton?: boolean
  
  // ツールチップ
  tooltip?: string;
  tooltipId?: string;

  // キーボードショートカット
  shortcutKey?: string;
  shortcutDescription?: string;
  
  // アニメーション
  animation?: 'none' | 'bounce' | 'pulse' | 'shake' | 'slideIn' | 'fadeIn';
  
  // エフェクト
  ripple?: boolean;
  
  // 長押し
  onLongPress?: () => void;
  longPressDelay?: number;
}

const TaneButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    // 基本props
    className,
    variant,
    size,
    children,

    skeleton = false,
    shortcutKey,
    shortcutDescription,
    animation = 'none',
    
    // カスタムprops
    ariaLabel,
    id,
    loading = false,
    loadingText,
    startIcon,
    endIcon,
    tooltip,
    tooltipId,
    ripple = false,
    onLongPress,
    longPressDelay = 500,
    
    // イベントハンドラ
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseLeave,

    


    
    // その他のprops
    ...props
  }, ref) => {
    const uniqueId = useId()
    const buttonId = id || `tane-button-${uniqueId}`
    const tooltipUniqueId = tooltipId || `${buttonId}-tooltip`
    const longPressTimerRef = useRef<ReturnType<typeof setTimeout>>()
    const [rippleStyle, setRippleStyle] = useState<{ left: number; top: number } | null>(null)

    useEffect(() => {
        if (!shortcutKey) return;
        
        const handleKeyDown = (e: KeyboardEvent) => {
          const keys = shortcutKey.toLowerCase().split('+');
          const isCtrl = keys.includes('ctrl') && e.ctrlKey;
          const isAlt = keys.includes('alt') && e.altKey;
          const isShift = keys.includes('shift') && e.shiftKey;
          const key = keys[keys.length - 1];
          
          if (
            e.key.toLowerCase() === key &&
            isCtrl === keys.includes('ctrl') &&
            isAlt === keys.includes('alt') &&
            isShift === keys.includes('shift')
          ) {
            e.preventDefault();
            onClick?.(e as any);
          }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [shortcutKey, onClick]);
    
    // Event Handlers
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) return
      
      // リップルエフェクト
      if (ripple) {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        setRippleStyle({
          left: e.clientX - rect.left - size / 2,
          top: e.clientY - rect.top - size / 2,
        })
      }
      
      onClick?.(e)
    }
    
    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onLongPress) {
        longPressTimerRef.current = setTimeout(onLongPress, longPressDelay)
      }
      onMouseDown?.(e)
    }
    
    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
      onMouseUp?.(e)
    }
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
      onMouseLeave?.(e)
    }

    if (skeleton) {
        return (
          <div
            className={cn(
              buttonVariants({ variant, size, animation, className }),
              "animate-pulse bg-gray-200 border-gray-200 text-transparent pointer-events-none"
            )}
          >
            {children}
          </div>
        );
      }

    return (
      <>
       <button
          id={buttonId}
          className={cn(buttonVariants({ variant, size, animation, className }))}
          ref={ref}
          disabled={loading || props.disabled}
          aria-label={ariaLabel}
          aria-busy={loading}
          aria-describedby={tooltip ? tooltipUniqueId : undefined}
          data-shortcut={shortcutKey}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {/* ローディングスピナー */}
          {loading && (
            <span className="mr-2 animate-spin">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </span>
          )}
          
          {/* 開始アイコン */}
          {!loading && startIcon && (
            <span className="mr-2">{startIcon}</span>
          )}

           {/* ショートカットの表示 */}
           {shortcutKey && (
            <span className="ml-2 text-xs opacity-60">
              {shortcutKey}
            </span>
          )}

           {/* ショートカットの説明（ツールチップ） */}
           {shortcutDescription && (
            <span
              id={`${buttonId}-shortcut`}
              className="sr-only"
              role="tooltip"
            >
              {shortcutDescription}
            </span>
          )}
          
          {/* メインコンテンツ */}
          {loading ? loadingText || children : children}
          
          {/* 終了アイコン */}
          {!loading && endIcon && (
            <span className="ml-2">{endIcon}</span>
          )}
          
          {/* リップルエフェクト */}
          {ripple && rippleStyle && (
            <span
              className="absolute rounded-full bg-white/30 animate-ripple"
              style={{
                left: rippleStyle.left,
                top: rippleStyle.top,
                width: '100px',
                height: '100px',
              }}
            />
          )}
        </button>
        
        {/* ツールチップ */}
        {tooltip && (
          <span
            id={tooltipUniqueId}
            className="sr-only"
            role="tooltip"
          >
            {tooltip}
          </span>
        )}
      </>
    )
  }
)

TaneButton.displayName = "TaneButton"

export { TaneButton, buttonVariants }