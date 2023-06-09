import { useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import { useEffect, useState } from "react";
import { getProfile } from "../fetchRequests/ProfileRequests";

export default function MobileUserPanel() {
  const navigate = useNavigate();

  const { activeTab, setActiveTab, results } = GeneralStore();

  const [profileId, setProfileId] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  useEffect(() => {
    (async function request() {
      // const response = await getTestProfile()
      const response = await getProfile();
      console.log(response);
      setProfileId(response.userProfile._id);
      setUserName(response.userProfile.userName);
    })();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
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
        className={(activeTab === "Trend" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Trend")}
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
        onClick={() => navigate(`/dashboard/user/profile/${profileId}`)}
        style={{ cursor: "pointer" }}
      >
        prof
      </div>
      {results ? (
          <div
            className={(activeTab === "Results" ? "active" : "") + " p-2"}
            style={{ cursor: "pointer" }}
            onClick={() => handleTabClick("Results")}
          >
            search results
          </div>
        ) : (
          ""
        )}
    </div>
  );
}
