import { useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";

export default function MobileUserPanel() {
  const { activeTab, setActiveTab } = GeneralStore();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();
  return (
    <div className="fixed flex justify-around bottom-0 left-0 w-full px-4 bg-white sm:hidden">
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
        rec
      </div>

      <div
        className={(activeTab === "AskQuestion" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("AskQuestion")}
        style={{ cursor: "pointer" }}
      >
        ask
      </div>
      <div
        className={(activeTab === "Profile" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Profile")}
        style={{ cursor: "pointer" }}
      >
        prof
      </div>
    </div>
  );
}
