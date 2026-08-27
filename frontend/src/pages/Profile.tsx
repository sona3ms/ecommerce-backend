import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

type User = {
  id: number;
  name: string;
  email: string;
};

function Profile() {
  const [user, setUser] = useState<User | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((data) => {
        console.log("Profile response:", data);

        setUser(data.user || data);
      })
      .catch((error) => {
        console.error(
          "Failed to load profile:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>Unable to load profile.</p>;
  }

  return (
    <main className="page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <h2>{user.name}</h2>

        <p>{user.email}</p>
      </div>
    </main>
  );
}

export default Profile;