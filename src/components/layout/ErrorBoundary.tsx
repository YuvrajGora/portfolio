import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--color-bg)] text-[var(--color-text)]">
          <p className="font-[var(--font-display)] text-3xl font-semibold">Something went wrong.</p>
          <p className="mt-3 text-[var(--color-text-muted)]">
            Refresh the page — if this keeps happening, check the console for details.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full px-6 py-3 text-sm font-medium bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-cyan)] text-black"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
