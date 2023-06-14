import { useEffect, useState } from "react";
import GeneralStore from "../store/GeneralContext";

export default function Profile() {
  const { userId } = GeneralStore();

  // PROFILE get
  // get user profile data, refresh on every load
  // of the dashboard component (see useEffect)

  const [userData, setUserData] = useState(null);

  async function getProfileData() {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/profile/${userId}`);
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setUserData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // PROFILE update
  const [userName, setUserName] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [age, setAge] = useState(null);

  // post request to update user profile when 'save' button clicked
  // user data is stored in variable data
  async function handleProfileUpdate(e) {
    e.preventDefault();
    console.log(userId);
    const data = { userName, nationality, age, userId };
    try {
      const response = await fetch("http://localhost:5000/dashboard/profile", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        return console.log("Profile updated!");
      }
      // error or show the response message from the backend
      // to let the user know, what is happening or why it doesn't work
      throw new Error("Profile update failed");
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "25%" }}>
      {/* label plus input for every property in the profileSchema */}
      <label>
        Username
        <input
          onChange={(e) => {
            setUserName(e.target.value);
            console.log(userName);
          }}
          type="text"
        />
      </label>
      <label>
        Nationality
        <input
          onChange={(e) => {
            setNationality(e.target.value);
            console.log(nationality);
          }}
          type="text"
        />
      </label>
      <label>
        age
        <input
          onChange={(e) => {
            setAge(e.target.value);
            console.log(age);
          }}
          type="text"
        />
      </label>
      <div>
        <button
          onClick={handleProfileUpdate}
          style={{ backgroundColor: "green", color: "white" }}
        >
          save
        </button>
      </div>
      <div>
        <h2>your profile data</h2>
        {userData ? <h3>{JSON.stringify(userData)}</h3> : ""}
      </div>
    </div>
  );
}
