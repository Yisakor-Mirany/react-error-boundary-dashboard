import ErrorBoundary from './ErrorBoundary'
import UserProfile from './UserProfile'
import Notifications from './Notifications'
import WeatherWidget from './WeatherWidget'

/**
 * Dashboard composes the three widgets.
 *
 * Only WeatherWidget is wrapped with ErrorBoundary. This means:
 *  - If WeatherWidget (or BuggyWeatherWidget inside it) throws, the
 *    ErrorBoundary catches it and renders the fallback UI in place of
 *    the weather card.
 *  - UserProfile and Notifications are completely unaffected — they
 *    live in separate subtrees with no shared ErrorBoundary ancestor
 *    that would also unmount them.
 */
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-info-banner">
        <strong>🎯 Demo:</strong> Click <em>"Simulate API Failure"</em> in the
        Weather widget. Only that widget crashes — the rest of the dashboard
        keeps working.
      </div>

      <div className="widgets-grid">
        {/* No ErrorBoundary — crashes here would propagate up */}
        <UserProfile />

        {/* No ErrorBoundary — crashes here would propagate up */}
        <Notifications />

        {/* ErrorBoundary isolates any crash inside WeatherWidget */}
        <ErrorBoundary>
          <WeatherWidget />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Dashboard
