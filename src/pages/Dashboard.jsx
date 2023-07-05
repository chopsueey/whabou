import { useState, useEffect } from "react";
import QuestionsOfWeek from "../components/QuestionsOfWeek.jsx";
import UserPanel from "../components/UserPanel.jsx";
import Feed from "../components/Feed.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Profile from "./Profile.jsx";
import MyQuestions from "./MyQuestions.jsx";
import { InfoSidebar } from "../components/InfoSidebar.jsx";
import GeneralStore from "../store/GeneralContext.jsx";
import Recommended from "../components/Recommended.jsx";


export default function Dashboard() {
  const { activeTab, setActiveTab } = GeneralStore();

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
      {/* searchbar */}
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
        <UserPanel />
        <div
          style={{ minHeight: "100vh" }}
          className="grow px-4 sm:px-6 lg:px-10 lg:pl-[15rem] xl:px-[17rem]"
        >
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
          <div
            data-aos="zoom-in-down"
            data-aos-delay="100"
            className={activeTab === "Recommended" ? "" : "hidden"}
          >
            <Recommended />
          </div>

          {activeTab === "AskQuestion" ? <MyQuestions /> : ""}
          {/* {activeTab === "Profile" ? <Profile /> : ""} */}
        </div>
        <InfoSidebar />
      </section>
    </div>
  );
}
