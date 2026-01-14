"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import {
  Alert02Icon,
  ArrowReloadHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  blockType?: string;
  className?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary for individual content blocks.
 * Catches rendering errors and displays a fallback UI without breaking the entire page.
 */
export class BlockErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `[BlockErrorBoundary] Error in block "${this.props.blockType || "unknown"}":`,
      error,
      errorInfo.componentStack
    );
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center",
            this.props.className
          )}
          role="alert"
        >
          <HugeiconsIcon
            className="size-8 text-destructive/60"
            icon={Alert02Icon}
          />
          <div>
            <p className="font-medium text-destructive/80">
              Error loading content
            </p>
            <p className="mt-1 text-muted-foreground text-sm">
              This section couldn't be displayed
            </p>
          </div>
          <Button onClick={this.handleRetry} size="sm" variant="outline">
            <HugeiconsIcon
              className="mr-1 size-3"
              icon={ArrowReloadHorizontalIcon}
            />
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
