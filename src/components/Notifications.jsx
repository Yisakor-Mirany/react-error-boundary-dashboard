import { useState } from 'react'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'like',
    icon: '❤️',
    text: 'Alice liked your post "React Tips & Tricks"',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    icon: '💬',
    text: 'Bob commented: "Great article on Error Boundaries!"',
    time: '15 min ago',
    read: false,
  },
  {
    id: 3,
    type: 'follow',
    icon: '👥',
    text: 'Carol started following you',
    time: '1 hr ago',
    read: false,
  },
  {
    id: 4,
    type: 'mention',
    icon: '📣',
    text: 'You were mentioned in "Advanced React Patterns"',
    time: '3 hrs ago',
    read: true,
  },
  {
    id: 5,
    type: 'share',
    icon: '🔁',
    text: 'Dave shared your post with 24 people',
    time: '5 hrs ago',
    read: true,
  },
]

function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () =>
    setNotifications(ns => ns.map(n => ({ ...n, read: true })))

  const markRead = id =>
    setNotifications(ns =>
      ns.map(n => (n.id === id ? { ...n, read: true } : n)),
    )

  return (
    <div className="widget notifications-widget">
      <div className="widget-header">
        <span className="widget-icon">🔔</span>
        <h2 className="widget-title">
          Notifications
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </h2>
        {unreadCount > 0 && (
          <button className="mark-all-read-btn" onClick={markAllRead}>
            Mark all read
          </button>
        )}
      </div>

      <ul className="notification-list">
        {notifications.map(n => (
          <li
            key={n.id}
            className={`notification-item ${n.read ? 'read' : 'unread'}`}
            onClick={() => markRead(n.id)}
          >
            <span className="notification-icon">{n.icon}</span>
            <div className="notification-body">
              <p className="notification-text">{n.text}</p>
              <span className="notification-time">{n.time}</span>
            </div>
            {!n.read && <span className="unread-dot" />}
          </li>
        ))}
      </ul>

      <p className="widget-note">
        ✅ This widget is <strong>not</strong> wrapped in an ErrorBoundary and
        continues to work normally even when the Weather Widget crashes.
      </p>
    </div>
  )
}

export default Notifications
