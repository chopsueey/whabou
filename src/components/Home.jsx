import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "./UserFunctions.jsx";
import bg from "../assets/akin-cakiner-unsplash.jpg";
import GeneralStore from "../store/GeneralContext";

export default function Home() {
  const navigate = useNavigate();

  const { modal, setModal, setUserId, setIsLoggedIn } = GeneralStore();

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
        setUserId(loginAttempt.userId);
        setIsLoggedIn(true);
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
        <h1 className="text-4xl">Welcome to Wabooo!</h1>
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
            <form className="signin flex flex-col p-4 text-center">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setModal(false)}
              >
                Close
              </span>
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
                  <label>
                    <input
                      type="text"
                      value={userName}
                      placeholder="username"
                      onChange={(evt) => setUserName(evt.target.value)}
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
              {register && (
                <label>
                  <input
                    type="password"
                    value={doubleCheckPassword}
                    placeholder="confirm password"
                    onChange={(evt) => setDoubleCheckPassword(evt.target.value)}
                  />
                </label>
              )}
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
        )}
      </div>
    </div>
  );
}
