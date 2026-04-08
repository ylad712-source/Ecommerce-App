import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userid = localStorage.getItem("userid");

        const res = await axios.get("http://localhost:4000/profile", {
          headers: {
            userid: userid
          }
        });

        if (res.data.success) {
          setUser(res.data.user);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);




  return (
   
  <div className="profile-page">
    {user ? (
      <div className="profile-card">   
        <h2>User Profile</h2>

        <p className="profile-info">
          <span>Name:</span> {user.name}
        </p>

        <p className="profile-info">
          <span>Email:</span> {user.email}
        </p>
      </div>
    ) : (
      <p className="loading-text">Loading...</p>  
    )}
  </div>
);
};

export default Profile;