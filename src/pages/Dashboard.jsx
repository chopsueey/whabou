import QuestionsOfWeek from "../components/QuestionsOfWeek.jsx";
import UserPanel from "../components/UserPanel.jsx";
import Feed from "../components/Feed.jsx";
import MyQuestions from "./MyQuestions.jsx";
import { InfoSidebar } from "../components/InfoSidebar.jsx";
import GeneralStore from "../store/GeneralContext.jsx";
import Recommended from "../components/Recommended.jsx";
import { Searchbar } from "../components/Searchbar.jsx";
import SearchResults from "../components/SearchResults.jsx";

export default function Dashboard() {
  const { activeTab, results } = GeneralStore();

  return (
    <div className="max-w-2xl mx-auto lg:max-w-5xl xl:max-w-none sm:px-6 lg:px-8">
      <section
        className="row"
        style={{
          backgroundColor: "#23272f",
          color: "white",
          borderBottom: "solid 3px #149eca",
        }}
      >
        <Searchbar />
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
          {activeTab === "Feed" ? <Feed /> : ""}

          {activeTab === "Trend" ? <QuestionsOfWeek /> : ""}

          {activeTab === "Recommended" ? <Recommended /> : ""}

          {activeTab === "AskQuestion" ? <MyQuestions /> : ""}
          {results ? <SearchResults /> : ""}
        </div>
        <InfoSidebar />
      </section>
    </div>
  );
}
