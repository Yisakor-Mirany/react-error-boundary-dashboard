import { useState } from 'react'

const STATS = [
  { label: 'Posts', value: 248 },
  { label: 'Followers', value: '12.4K' },
  { label: 'Following', value: 391 },
]

function UserProfile() {
  const [followed, setFollowed] = useState(false)

  return (
    <div className="widget user-profile-widget">
      <div className="widget-header">
        <span className="widget-icon">👤</span>
        <h2 className="widget-title">User Profile</h2>
        <span className="widget-status online">● Online</span>
      </div>

      <div className="profile-avatar-row">
        <div className="profile-avatar">JD</div>
        <div className="profile-info">
          <h3 className="profile-name">Jane Doe</h3>
          <p className="profile-handle">@janedoe</p>
          <p className="profile-bio">
            Full-stack developer · Coffee enthusiast · Open-source contributor
          </p>
        </div>
      </div>

      <div className="profile-stats">
        {STATS.map(({ label, value }) => (
          <div key={label} className="stat-item">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>

      <button
        className={`profile-follow-btn ${followed ? 'following' : ''}`}
        onClick={() => setFollowed(f => !f)}
      >
        {followed ? '✓ Following' : '+ Follow'}
      </button>

      <p className="widget-note">
        ✅ This widget is <strong>not</strong> wrapped in an ErrorBoundary and
        continues to work normally even when the Weather Widget crashes.
      </p>
    </div>
  )
}

export default UserProfile
