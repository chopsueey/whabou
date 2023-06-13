export const userRegister = async (data) => {
  try {
    const response = await fetch("https://wabooo-server.onrender.com/register", {
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
    const response = await fetch("https://wabooo-server.onrender.com/login", {
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