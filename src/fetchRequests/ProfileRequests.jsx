export async function getProfile() {
  try {
    const response = await fetch(`http://localhost:5000/dashboard/profile`, {
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log("Profile uploaded");
      return data;
    }
    console.log(data);
    if (response.status === 400) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function patchProfile(data) {
  try {
    const response = await fetch(`http://localhost:5000/dashboard/profile`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      const result = await response.json();
      return console.log("Profile updated!", result);
    }
    console.log(result);
    if (response.status === 400) {
      return result;
    }
    //throw new Error("Profile update failed");
  } catch (err) {
    console.log(err);
  }
}
