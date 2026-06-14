import { useState } from 'react'

/**
 * BuggyWeatherWidget intentionally throws during rendering to demonstrate
 * how an ErrorBoundary isolates a crash to a single widget. When shouldCrash
 * is true, the component throws before returning any JSX — React will unwind
 * the render and invoke the nearest ErrorBoundary ancestor.
 */
function BuggyWeatherWidget({ shouldCrash }) {
  if (shouldCrash) {
    throw new Error(
      'WeatherWidget: failed to fetch weather data (simulated API failure)',
    )
  }

  const forecasts = [
    { day: 'Mon', icon: '☀️', high: 28, low: 18 },
    { day: 'Tue', icon: '⛅', high: 24, low: 15 },
    { day: 'Wed', icon: '🌧️', high: 19, low: 12 },
    { day: 'Thu', icon: '⛈️', high: 17, low: 11 },
    { day: 'Fri', icon: '☀️', high: 25, low: 16 },
  ]

  return (
    <>
      <div className="weather-current">
        <div className="weather-main">
          <span className="weather-temp-large">22°C</span>
          <span className="weather-icon-large">⛅</span>
        </div>
        <div className="weather-meta">
          <p className="weather-condition">Partly Cloudy</p>
          <p className="weather-location">📍 San Francisco, CA</p>
          <p className="weather-detail">Humidity 65% · Wind 12 km/h</p>
        </div>
      </div>

      <div className="weather-forecast">
        {forecasts.map(f => (
          <div key={f.day} className="forecast-day">
            <span className="forecast-label">{f.day}</span>
            <span className="forecast-icon">{f.icon}</span>
            <span className="forecast-high">{f.high}°</span>
            <span className="forecast-low">{f.low}°</span>
          </div>
        ))}
      </div>
    </>
  )
}

function WeatherWidget() {
  const [shouldCrash, setShouldCrash] = useState(false)

  return (
    <div className="widget weather-widget">
      <div className="widget-header">
        <span className="widget-icon">🌤️</span>
        <h2 className="widget-title">Weather</h2>
        <span className="widget-badge error-badge">ErrorBoundary ✓</span>
      </div>

      <BuggyWeatherWidget shouldCrash={shouldCrash} />

      <div className="weather-actions">
        <button
          className="crash-btn"
          onClick={() => setShouldCrash(true)}
        >
          💥 Simulate API Failure
        </button>
      </div>

      <p className="widget-note crash-note">
        ⚠️ This widget is wrapped in an <strong>ErrorBoundary</strong>. Click
        the button above to simulate a crash — only this widget will fail.
      </p>
    </div>
  )
}

export default WeatherWidget
