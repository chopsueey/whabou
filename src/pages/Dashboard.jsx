import { useState, useEffect } from "react";
import QuestionsOfWeek from "../components/QuestionsOfWeek.jsx";
import UserPanel from "../components/UserPanel.jsx";
import Feed from "../components/Feed.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Profile from "./Profile.jsx";
import MyQuestions from "./MyQuestions.jsx";
import { InfoSidebar } from "../components/InfoSidebar.jsx";

// window.addEventListener("scroll", () => console.log(window.scrollbars))

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Feed");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    AOS.refresh(); // AOS-Animation manuell auslösen
  }, [activeTab]);

  return (
    <div className="max-w-2xl mx-auto lg:max-w-5xl xl:max-w-none sm:px-6 lg:px-8">
      {/* heading */}
      <section
        className="row"
        style={{
          backgroundColor: "#23272f",
          color: "white",
          borderBottom: "solid 3px #149eca",
        }}
      >
        <div className="flex items-center justify-center my-3">
          <input
            className="mt-2 px-4 py-1 bg-white text-gray-800 rounded-md w-48 mr-2"
            type="text"
            placeholder="What about..?"
          />
          <button className="mt-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-1">
            🔎
          </button>
        </div>
      </section>
      {/* content of dashboard page */}
      <section
        className="row flex flex-col lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative"
        style={{
          backgroundColor: "#23272f",
          color: "white",
        }}
      >
        <div className="hidden sm:block lg:fixed lg:w-1/4 xl:w-auto sm:px-6 lg:px-10">
          {/* <UserPanel /> */}
          <div className="user-panel flex lg:flex-col border-l-2">
            <div
              style={{ cursor: "pointer" }}
              // onClick={() => navigate("/dashboard/myquestions")}
              className={(activeTab === "Feed" ? "active" : "") + " p-2"}
              onClick={() => handleTabClick("Feed")}
            >
              feed
            </div>
            <div
              className={(activeTab === "Questions" ? "active" : "") + " p-2"}
              onClick={() => handleTabClick("Questions")}
              style={{ cursor: "pointer" }}
              // onClick={() => navigate("/dashboard/myquestions")}
            >
              trend
            </div>
            <div
              className={(activeTab === "Recommended" ? "active" : "") + " p-2"}
              onClick={() => handleTabClick("Recommended")}
              style={{ cursor: "pointer" }}
              // onClick={() => navigate("/dashboard/myquestions")}
            >
              recommended
            </div>

            <div
              className={(activeTab === "AskQuestion" ? "active" : "") + " p-2"}
              onClick={() => handleTabClick("AskQuestion")}
              style={{ cursor: "pointer" }}
              // onClick={() => navigate("/dashboard/myquestions")}
            >
              ask a question
            </div>
            <div
              className={(activeTab === "Profile" ? "active" : "") + " p-2"}
              onClick={() => handleTabClick("Profile")}
              style={{ cursor: "pointer" }}
              // onClick={() => navigate("/dashboard/profile")}
            >
              profile
            </div>
          </div>
        </div>
        <div
          style={{ minHeight: "30vh" }}
          className="grow sm:px-6 lg:px-10 lg:pl-[15rem] xl:px-[17rem] 2xl:px-[20rem]"
        >
          {/* <nav className="submenu">
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
            </ul>
          </nav> */}

          <div
            data-aos="zoom-in-down"
            data-aos-delay="100"
            className={activeTab === "Feed" ? "" : "hidden"}
          >
            <Feed />
          </div>
          <div
            data-aos="zoom-in-down"
            data-aos-delay="100"
            className={activeTab === "Questions" ? "" : "hidden"}
          >
            <QuestionsOfWeek />
          </div>

          {activeTab === "AskQuestion" ? <MyQuestions /> : ""}
          {activeTab === "Profile" ? <Profile /> : ""}
        </div>
        <InfoSidebar/>
      </section>
    </div>
  );
}
