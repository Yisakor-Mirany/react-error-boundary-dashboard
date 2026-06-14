import { Component } from 'react'

/**
 * ErrorBoundary must be a CLASS component.
 *
 * WHY CLASS COMPONENTS?
 * Error Boundaries rely on two lifecycle methods that only exist on class
 * components: getDerivedStateFromError and componentDidCatch. React's
 * reconciler calls these at specific points during the render/commit phase
 * and there is currently no Hook equivalent. Functional components cannot
 * be Error Boundaries.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  /**
   * getDerivedStateFromError(error)
   *
   * This static lifecycle method is called during the "render" phase
   * when a descendant component throws. Its sole job is to return new
   * state so that the next render shows the fallback UI instead of the
   * crashed tree. It is a pure function — no side effects allowed here.
   *
   * Flow: child throws → React unwinds → calls this → merges returned
   * object into state → re-renders this component with hasError: true.
   */
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    }
  }

  /**
   * componentDidCatch(error, errorInfo)
   *
   * This lifecycle method is called during the "commit" phase after the
   * fallback UI has been painted. Unlike getDerivedStateFromError it IS
   * allowed to produce side effects, which makes it the right place to:
   *   - Log errors to an external service (Sentry, Datadog, etc.)
   *   - Record diagnostic information for debugging
   *
   * errorInfo.componentStack is a string showing which components are in
   * the tree above the one that threw.
   */
  componentDidCatch(error, errorInfo) {
    console.group('🚨 ErrorBoundary caught an error')
    console.error('Error:', error)
    console.error('Component Stack:', errorInfo.componentStack)
    console.groupEnd()

    this.setState({ errorInfo })
  }

  handleReset = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback" role="alert">
          <div className="error-boundary-icon">⚠️</div>
          <h2 className="error-boundary-heading">Something went wrong</h2>
          <p className="error-boundary-message">
            This widget encountered an unexpected error and could not be
            displayed. The rest of the dashboard is still working normally.
          </p>
          {this.state.error && (
            <details className="error-boundary-details">
              <summary>Technical details</summary>
              <pre>{this.state.error.toString()}</pre>
              {this.state.errorInfo && (
                <pre>{this.state.errorInfo.componentStack}</pre>
              )}
            </details>
          )}
          <button
            className="error-boundary-button"
            onClick={this.handleReset}
          >
            🔄 Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
