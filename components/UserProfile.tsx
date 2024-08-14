// /components/UserProfile.tsx

import { User } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName || user.email}!</h1>
      <p>Email: {user.email}</p>
      {user.photoURL && <Image src={user.photoURL} alt="User profile picture" width={100} height={100} />}
    </div>
  );
};

export default UserProfile;
