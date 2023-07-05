import { useEffect, useState } from "react";
import { getProfile, patchProfile } from "../fetchRequests/ProfileRequests";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Info");

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


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
    setIsSaving(true);
    await patchProfile(data);
    setUserData(await getProfile());
    setIsSaving(false);
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // get user profile data, refresh on every load
  useEffect(() => {
    (async function request() {
      setIsLoading(true);
      setUserData(await getProfile());
      setIsLoading(false);
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
              {/* <h1 className="my-4 h-full text-lg decoration-sky-500 border-b-4 border-sky-500 text-center">
                Favorites{" "}
              </h1> */}
              <div className="flex flex-col items-center my-4">
                <p>
                  Sollte sich Bella Swan für Jacob statt für Edward entscheiden?
                </p>
                <p>
                  Darf ich meinen Hund in der Waschmaschine waschen, bei
                  niedriger Temperatur?
                </p>
                <p>
                  Ich bin in den Vater meines Freundes verliebt... Soll ich es
                  dem Vater sagen und eventuell mit ihm eine Affäre anfangen?
                </p>
              </div>
            </div>
          )}
          {activeTab === "Info" && (
            <div>
              {/* <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Info{" "}
              </h1> */}
              <div style={{ color: "white" }}>
                <h2>your profile data</h2>
                {isLoading ? (
                  <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
                  </div>
                ) : (
                  <div>
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
                )}
              </div>
            </div>
          )}
          {activeTab === "Friends" && (
            <div className="">
              {/* <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Friends{" "}
              </h1> */}
              <div className="flex flex-col items-center my-4">
                <p>Klaus Dieter</p>
                <p>Frankie goes to Hollywood</p>
                <p>Pippi Langstrumpf</p>
              </div>
            </div>
          )}
          {activeTab === "Edit" && (
            <div>
              {/* <h1 className="my-4 h-full text-lg decoration-sky-500 border-b-4 border-sky-500 text-center">
                Edit{" "}
              </h1> */}
              <div>
                <form className="bg-gray-800 p-8 rounded-lg max-w-md mx-auto">
                  <label className="block text-white text-xs font-bold mb-2">
                    Username
                    <input
                      className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                      onChange={(e) => {
                        setUserName(e.target.value);
                        console.log(userName);
                      }}
                      type="text"
                    />
                  </label>

                  <label className="block text-white text-xs font-bold mb-2">
                    Nationality
                    <input
                      className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                      onChange={(e) => {
                        setNationality(e.target.value);
                        console.log(nationality);
                      }}
                      type="text"
                    />
                  </label>

                  <label className="block text-white text-xs font-bold mb-2">
                    Age
                    <input
                      className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                      onChange={(e) => {
                        setAge(e.target.value);
                        console.log(age);
                      }}
                      type="text"
                    />
                  </label>
                </form>
              </div>
              <div className="flex justify-center my-4">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={handleProfileUpdate}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <div className="mr-2 animate-spin">
                        <svg
                          className="w-5 h-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M16 12a4 4 0 1 1-8 0m8 0H8" />
                        </svg>
                      </div>
                      Saving...
                    </div>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
