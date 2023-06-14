import { useState } from "react";

export default function Profile() {
    // PROFILE
  const [userName, setUserName] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [age, setAge] = useState(null);
    // post request to update user profile when 'save' button clicked
  // user data is stored in varibale data
  async function handleProfileUpdate(e) {
    e.preventDefault();
    const data = { userName, nationality, age };
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
    </div>
  );
}
