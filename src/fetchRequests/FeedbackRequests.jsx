export async function getFeedback() {
  const response = await fetch("http://localhost:5000/dashboard/myfeedbacks", {
    credentials: "include",
  });
  const data = await response.json();
  if (response.status === 200) {
    return data;
  }
}

export async function postFeedback (data) {
  try {
    const response = await fetch(
      "http://localhost:5000/dashboard/myfeedbacks",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status === 201) {
      return console.log("Feedback uploaded!");
    }
    if (response.status === 400) {
      return console.log("Feedback nicht uploaded!");
    }
    //throw new Error("Feedback update failed");
  } catch (err) {
    console.log(err);
  }
}