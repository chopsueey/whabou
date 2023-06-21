import { useState } from "react";
import QuestionsOfWeek from "../components/QuestionsOfWeek.jsx";
import UserPanel from "../components/UserPanel.jsx";
import Feed from "../components/Feed.jsx";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Feed");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto">
      {/* heading */}
      <section className="row"
        style={{
          backgroundColor: "#23272f",
          color: "white",
          borderBottom: "solid 3px #149eca",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        {/* {userData ? <h2>Welcome, {userData[0].userName}</h2> : ""} */}
      </section>
      {/* content of dashboard page */}
      <section
        className="row flex flex-col lg:flex-row"
        style={{
          backgroundColor: "#23272f",
          color: "white",
        }}
      >
        <UserPanel />
        <div className="grow">
          <nav className="submenu">
            <ul className="flex">
              <li
                className={activeTab === "Feed" ? "active" : ""}
                onClick={() => handleTabClick("Feed")}
              >
                Feed
              </li>
              <li
                className={activeTab === "Questions" ? "active" : ""}
                onClick={() => handleTabClick("Questions")}
              >
                Questions of the week
              </li>
              {/* <li
              className={activeTab === "UserPanel" ? "active" : ""}
              onClick={() => handleTabClick("UserPanel")}
            >
              User panel
            </li> */}
            </ul>
          </nav>

          {activeTab === "Feed" && <Feed />}
          {activeTab === "Questions" && <QuestionsOfWeek />}
          {/* {activeTab === "UserPanel" && <UserPanel />} */}
        </div>
      </section>
    </div>
  );
}
