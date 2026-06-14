# React Error Boundary Dashboard

A production-quality Social Media Dashboard that demonstrates how **React Error Boundaries** isolate component failures so one crashed widget never takes down your entire UI.

---

## Features

- **ErrorBoundary class component** using `getDerivedStateFromError` and `componentDidCatch`
- **Professional fallback UI** with error details, a friendly explanation, and a reload button
- **Selective wrapping** — only the Weather widget is guarded; Profile and Notifications are untouched
- **Live crash demo** — click "Simulate API Failure" to watch the isolation in action
- **Dark-mode dashboard** with modern CSS Grid layout and responsive design
- **Interactive widgets**: follow/unfollow button on the Profile, mark-as-read on Notifications

---

## File Structure

```
src/
├── components/
│   ├── ErrorBoundary.jsx   ← Class component, the Error Boundary
│   ├── UserProfile.jsx     ← Functional component, not wrapped
│   ├── Notifications.jsx   ← Functional component, not wrapped
│   ├── WeatherWidget.jsx   ← Functional component, wrapped by ErrorBoundary
│   └── Dashboard.jsx       ← Composes all widgets, applies ErrorBoundary
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/yisakor-mirany/react-error-boundary-dashboard.git
cd react-error-boundary-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Production build

```bash
npm run build
npm run preview
```

---

## How Error Boundaries Work

### Why class components?

Error Boundaries depend on two React lifecycle methods that only exist on class components:

| Method | Phase | Purpose |
|---|---|---|
| `static getDerivedStateFromError(error)` | Render | Returns state update to show fallback UI |
| `componentDidCatch(error, errorInfo)` | Commit | Side-effect safe — log to Sentry, etc. |

React's reconciler invokes these hooks at specific points during rendering and committing. There is currently no Hook equivalent; attempting to replicate them with `useEffect` won't work because by the time `useEffect` runs, the render has already failed without a boundary.

### getDerivedStateFromError

```jsx
static getDerivedStateFromError(error) {
  // Called during the render phase — must be a pure function (no side effects).
  // Return value is merged into component state, which triggers a re-render
  // that displays the fallback UI instead of the crashed subtree.
  return { hasError: true, error }
}
```

### componentDidCatch

```jsx
componentDidCatch(error, errorInfo) {
  // Called during the commit phase after the fallback has been painted.
  // Side effects are allowed here — log to an external service.
  console.error(error)
  console.error(errorInfo.componentStack) // full React component stack
}
```

### Boundary placement matters

Wrapping a component in `<ErrorBoundary>` creates an isolation zone. Any rendering error thrown by a child (or any descendant) is caught by the nearest `ErrorBoundary` ancestor and replaced with the fallback UI. Siblings outside the boundary are unaffected.

```jsx
{/* These widgets are NOT guarded — a crash here would propagate up */}
<UserProfile />
<Notifications />

{/* Only the WeatherWidget subtree is guarded */}
<ErrorBoundary>
  <WeatherWidget />
</ErrorBoundary>
```

---

## Screenshots

| Normal state | After Weather crash |
|---|---|
| *(screenshot placeholder)* | *(screenshot placeholder)* |

---

## Learning Outcomes

After studying this project you will understand:

1. **Why Error Boundaries must be class components** and what React lifecycle methods power them
2. **The difference** between `getDerivedStateFromError` (render phase, pure) and `componentDidCatch` (commit phase, side-effects ok)
3. **How to scope a boundary** so a single widget failure never cascades to the rest of your app
4. **How to build a professional fallback UI** that keeps users informed and gives them a recovery path
5. **How error logging fits in** — `componentDidCatch` is the integration point for Sentry, Datadog, LogRocket, etc.
