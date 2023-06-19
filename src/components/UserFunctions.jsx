import { useNavigate } from "react-router-dom";

export const userRegister = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      return console.log("Registrierung erfolgreich!");
    }
    throw new Error("Registrierung fehlgeschlagen!");
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const userData = await response.json();
    if (response.status === 200) {
      console.log("Anmeldung erfolgreich!");
      return userData;
    }
    throw new Error("Anmeldung fehlgeschlagen!");
  } catch (error) {
    console.log(error);
  }
};

export async function userLogout() {

  try {
    const response = await fetch("http://localhost:5000/logout");
    console.log(response);
    if (response.status === 201) {
      //- funktioniert mit 404, aber mit 200 - logout fehlgeschlagen, aber mit Frontend kann Ok sein
      //if (response.status === 200)

      return 0;
    }
    throw new Error("Logout fehlgeschlagen!");
  } catch (error) {
    console.log(error);
  }
}
