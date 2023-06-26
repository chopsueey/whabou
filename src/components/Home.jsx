import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "../fetchRequests/UserRequests.jsx";
import bg from "../assets/akin-cakiner-unsplash.jpg";
import GeneralStore from "../store/GeneralContext";

export default function Home() {
  const navigate = useNavigate();


  const { modal, setModal, setHasCookie } = GeneralStore();


  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doubleCheckPassword, setDoubleCheckPassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (register && doubleCheckPassword !== password)
      return console.log("Your passwords are not equal.");
    const data = { name, userName, email, password };
    console.log(data);
    setRegister(false);
    setName("");
    setEmail("");
    setPassword("");
    if (!register) {
      const loginAttempt = await userLogin(data);
      if (loginAttempt) {

        setHasCookie(true);

        setModal(false);
        navigate("/dashboard");
        return;
      }
      return;
    }

    await userRegister(data);

    setModal(false);
  };

  return (
    <div className="wrapper" style={{ height: "50vh" }}>
      <div
        className="flex flex-col justify-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      >
        <h1 className="text-4xl textc">Welcome to Wabooo!</h1>
        {/* <dialog id="d">
          <div className="modal">
            <form className="signin flex flex-col p-4 text-center">
              <h3>{register ? "Sign up" : "Log into your account!"}</h3>
              {register && (
                <>
                  <label>
                    <input
                      type="text"
                      value={name}
                      placeholder="name"
                      onChange={(evt) => setName(evt.target.value)}
                    />
                  </label>
                </>
              )}
              <label>
                <input
                  type="email"
                  value={email}
                  placeholder="email"
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </label>
              <label>
                <input
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </label>
              <button onClick={handleSubmit}>
                {register ? "Create account" : "Sign in"}
              </button>
              {register ? (
                <p className="register">
                  <span onClick={() => setRegister(false)}>To sign in</span>
                </p>
              ) : (
                <p className="register">
                  Not signed up yet?{" "}
                  <span onClick={() => setRegister(true)}>Sign up!</span>
                </p>
              )}
            </form>
          </div>
          <button onClick={() => d.close()}>close</button>
        </dialog> */}
        {modal && (
          <div className="modal">
            <form className="signin flex flex-col p-4 text-center bg-gray-800 rounded-lg max-w-md mx-auto">
              <span className="textc font-bold"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModal(false);
                  setRegister(false);
                }}
              >
                Close
              </span>
              <h3 className="text-white">{register ? "Sign up" : "Log into your account!"}</h3>
              {register && (
                <>
                  <label className="block text-white text-xs font-bold mb-2">
                    <input
                      className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                      type="text"
                      value={name}
                      placeholder="name"
                      onChange={(evt) => setName(evt.target.value)}
                    />
                  </label>
                  <label className="block text-white text-xs font-bold mb-2">
                    <input
                      className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                      type="text"
                      value={userName}
                      placeholder="username"
                      onChange={(evt) => setUserName(evt.target.value)}
                    />
                  </label>
                </>
              )}
              <label className="block text-white text-xs font-bold mb-2">
                <input
                  className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                  type="email"
                  value={email}
                  placeholder="email"
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </label>
              <label className="block text-white text-xs font-bold mb-2">
                <input
                  className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </label>
              {register && (
                <label className="block text-white text-xs font-bold mb-2">
                  <input
                    className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                    type="password"
                    value={doubleCheckPassword}
                    placeholder="confirm password"
                    onChange={(evt) => setDoubleCheckPassword(evt.target.value)}
                  />
                </label>
              )}
              <button
                className=" mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2"
                onClick={handleSubmit}
              >
                {register ? "Create account" : "Sign in"}
              </button>
              {register ? (
                <p className="register">
                  <span onClick={() => setRegister(false)}>To sign in</span>
                </p>
              ) : (
                <p className="register mb-4">
                 
                  <span className="mt-4 text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setRegister(true)}>Register</span>
                  
                </p>
                
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
