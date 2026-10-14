import { useState } from "react";
import UserProfile from "./Userprofile";

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">My Website</div>

      <div className="navbar-account">
        <button
          type="button"
          className="user-logo"
          onClick={() => setShowProfile((previous) => !previous)}
          aria-label="Show user profile"
        >
          M
        </button>

        {showProfile && (
          <UserProfile
            onClose={() => setShowProfile(false)}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;