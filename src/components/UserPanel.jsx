import { useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";

export default function UserPanel() {
  const { activeTab, setActiveTab } = GeneralStore();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();
  return (
    <div className="hidden sm:block lg:fixed lg:w-1/4 xl:w-auto sm:px-6 lg:px-10">
      <div className="user-panel flex lg:flex-col border-l-2">
        <div
          style={{ cursor: "pointer" }}
          className={(activeTab === "Feed" ? "active" : "") + " p-2"}
          onClick={() => handleTabClick("Feed")}
        >
          feed
        </div>
        <div
          className={(activeTab === "Questions" ? "active" : "") + " p-2"}
          onClick={() => handleTabClick("Questions")}
          style={{ cursor: "pointer" }}
        >
          trend
        </div>
        <div
          className={(activeTab === "Recommended" ? "active" : "") + " p-2"}
          onClick={() => handleTabClick("Recommended")}
          style={{ cursor: "pointer" }}
        >
          recommended
        </div>

        <div
          className={(activeTab === "AskQuestion" ? "active" : "") + " p-2"}
          onClick={() => handleTabClick("AskQuestion")}
          style={{ cursor: "pointer" }}
        >
          ask a question
        </div>
        <div
          className={(activeTab === "Profile" ? "active" : "") + " p-2"}
          // onClick={() => handleTabClick("Profile")}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard/profile")}
        >
          profile
        </div>
      </div>
    </div>
  );
}
