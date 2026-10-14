import { useAuth } from "../context/AuthContext";

function UserProfile({ onClose }) {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="profile-card">
      <h3>User Profile</h3>

      <div className="profile-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>User ID:</strong>
        <br />
        {user.id}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <button
        type="button"
        className="logout-button"
        onClick={() => {
          logout();
          onClose();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;