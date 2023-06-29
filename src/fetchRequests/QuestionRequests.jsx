export async function getQuestions() {
  const response = await fetch("http://localhost:5000/dashboard/myquestions", {
    credentials: "include",
  });
  const data = await response.json();
  if (response.status === 200) {
    return data;
  }
}

export async function postQuestion(data) {
  try {
    const response = await fetch(
      "http://localhost:5000/dashboard/myquestions",
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
      return console.log("Frage uploaded!");
    }
    if (response.status === 400) {
      return console.log("Frage nicht uploaded!");;
    }
    // error or show the response message from the backend
    // to let the user know, what is happening or why it doesn't work
    //throw new Error("Frage update failed");
  } catch (err) {
    console.log(err);
  }
}

export async function postAnswer(data) {
  try {
    const response = await fetch(
      `http://localhost:5000/dashboard/question/answer`,
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
      return console.log("Answer posted");
    }
     if (response.status === 400) {
       return console.log("Try again to post your answer");
     }
  } catch (err) {
    console.log(err);
  }
}

export async function getFeed(sortBy) {
  const response = await fetch(
    `http://localhost:5000/dashboard/feed/sort/?sortBy=${sortBy}`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  if (response.status === 200) {
    console.log(data);
    return data.found;
  }
}
