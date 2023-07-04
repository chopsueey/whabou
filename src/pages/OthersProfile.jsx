import { useEffect, useState } from "react";
import { getProfile, patchProfile } from "../fetchRequests/ProfileRequests";

export default function OthersProfile() {
  const [activeTab, setActiveTab] = useState("Info");

  // PROFILE

  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [age, setAge] = useState(null);

  // patch request to update user profile when 'save' button clicked
  // user data is stored in variable data
  async function handleProfileUpdate(e) {
    e.preventDefault();
    const data = { userName, nationality, age };
    await patchProfile(data);
    setUserData(await getProfile());
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // get user profile data, refresh on every load
  useEffect(() => {
    (async function request() {
      setUserData(await getProfile());
    })();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex-col p-6 md:p-0 justify-around">
        <nav className="row">
          <ul className="flex flex-row space-x-12">
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeTab === "Info" ? "selected-tab rounded-full" : ""
              }`}
              onClick={() => handleTabClick("Info")}
            >
              Info
            </li>
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeTab === "Favorites" ? "selected-tab rounded-full" : ""
              }`}
              onClick={() => handleTabClick("Favorites")}
            >
              Favorites
            </li>

            <li
              className={`px-4 py-2 cursor-pointer ${
                activeTab === "Friends" ? "selected-tab rounded-full" : ""
              }`}
              onClick={() => handleTabClick("Friends")}
            >
              Friends
            </li>
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeTab === "Edit" ? "selected-tab rounded-full" : ""
              }`}
              onClick={() => handleTabClick("Edit")}
            >
              Edit
            </li>
          </ul>
        </nav>
        <div>
          {activeTab === "Favorites" && (
            <div>
              <h1 className="my-4 h-full text-lg decoration-sky-500 border-b-4 border-sky-500 text-center">
                Favorites{" "}
              </h1>
              <div className="flex flex-col items-center my-4">
                <p>
                  Sollte sich Bella Swan für Jacob statt für Edward entscheiden?
                </p>
                <p>
                  Darf ich meinen Hund in der Waschmachine waschen, bei
                  niedriger Temperatur?
                </p>
                <p>
                  Ich bin in den Vater meines Freundes verliebt... Soll ich es
                  dem Vater sagen und evtl. mit ihm eine Affäre anfangen?
                </p>
              </div>
            </div>
          )}
          {activeTab === "Info" && (
            <div>
              <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Info{" "}
              </h1>

              <div style={{ color: "white" }}>
                <h2>your profile data</h2>
                {userData ? (
                  <>
                    <h3>{userData.userName}</h3>
                    <h3>{userData.nationality}</h3>
                    <h3>{userData.age}</h3>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
          {activeTab === "Friends" && (
            <div className="">
              <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Friends{" "}
              </h1>
              <div className="flex flex-col items-center my-4">
                <p>Klaus Dieter</p>
                <p>Frankie goes to Hollywood</p>
                <p>Pipi Langstrumpf</p>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
