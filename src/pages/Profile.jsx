import { useEffect, useState } from "react";
import GeneralStore from "../store/GeneralContext";

export default function Profile() {
  const { userId } = GeneralStore();
  const [activeTab, setActiveTab] = useState("Favoriten");

  // PROFILE get
  // get user profile data, refresh on every load
  // of the dashboard component (see useEffect)

  const [userData, setUserData] = useState(null);

  async function getProfileData() {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/profile/${userId}`
      );
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
    const [userName, setUserName] = useState(null);
    const [nationality, setNationality] = useState(null);
    const [age, setAge] = useState(null);
    

    const handleProfileUpdate = async (e) => {
      e.preventDefault();
      console.log(userId);
      const data = { userName, nationality, age, userId };
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/profile",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          return console.log("Profile updated!");
        }
        throw new Error("Profile update failed");
      } catch (err) {
        console.log(err);
      }
    };
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <li
            className={activeTab === "Favoriten" ? "active" : ""}
            onClick={() => handleTabClick("Favoriten")}
          >
            Favoriten
          </li>
          <li
            className={activeTab === "Info" ? "active" : ""}
            onClick={() => handleTabClick("Info")}
          >
            Info
          </li>
          <li
            className={activeTab === "Freunde" ? "active" : ""}
            onClick={() => handleTabClick("Freunde")}
          >
            Freunde
          </li>
        </ul>
      </nav>
      <div>
        {activeTab === "Favoriten" && (
          <div>
            <h1>Favoriten </h1>
            <p>
              Sollte sich Bella Swan für Jacob statt für Edward entscheiden?
            </p>
            <p>
              Darf ich meinen Hund in der Waschmachine waschen, bei niedriger
              Temperatur?
            </p>
            <p>
              Ich bin in den Vater meines Freundes verliebt... Soll ich es dem
              Vater sagen und evtl. mit ihm eine Affäre anfangen?
            </p>
          </div>
        )}
        {activeTab === "Info" && (
          <div>
            <h1>Info </h1>
            <p>Kommt noch</p>
          </div>
        )}
        {activeTab === "Freunde" && (
          <div>
            <h1>Freunde </h1>
            <p>Klaus Dieter</p>
            <p>Frankie goes to Hollywood</p>
            <p>Pipi Langstrumpf</p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "25%" }}>
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
      <div>
        <h2>your profile data</h2>
        {userData ? <h3>{JSON.stringify(userData)}</h3> : ""}
      </div>
    </div>
  );
}
