import { useState } from "react";

export default function Profile() {
  const [userName, setUserName] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [age, setAge] = useState(null);
  const [activeTab, setActiveTab] = useState("Favoriten");

  const handleProfileUpdate = async (e) => {
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
      throw new Error("Profile update failed");
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
        <div><h1>Favoriten </h1>
        <p>Sollte sich Bella Swan für Jacob statt für Edward entscheiden?</p>
        <p>Darf ich meinen Hund in der Waschmachine waschen, bei niedriger Temperatur?</p>
        <p>Ich bin in den Vater meines Freundes verliebt... Soll ich es dem Vater sagen und evtl. mit ihm eine Affäre anfangen?</p></div>)}
        {activeTab === "Info" && (
       <div>
        <h1>Info </h1>
        <p>Kommt noch</p>
        </div> )}
        {activeTab === "Freunde" && (
        <div><h1>Freunde </h1>
        <p>Klaus Dieter</p>
        <p>Frankie goes to Hollywood</p>
        <p>Pipi Langstrumpf</p></div>)}
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
    </div>
  );
}