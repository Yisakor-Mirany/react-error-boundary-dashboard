import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Social Media Dashboard</h1>
        <p className="app-subtitle">Demonstrating React Error Boundaries in action</p>
      </header>
      <main className="app-main">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
