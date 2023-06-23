import { useState } from "react";

export const Question = ({ question }) => {
  const [userAnswer, setUserAnswer] = useState("");

  async function handleClick(answer) {
    answer === "yes" ? setUserAnswer("yes") : setUserAnswer("no");
    const questionId = question._id;
    const data = { questionId, userAnswer };
    // fetch(
    //   `http://localhost:5000/dashboard/?answer=${userAnswer}&question=${question._id}`,
    //   {
    //     credentials: "include",
    //   }
    // );
    fetch(`/dashboard/question/answer`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  return (
    <>
      {question ? (
        <figure
          style={{ border: "1px solid white" }}
          className="p-3 bg-gray-800 text-white mb-2 rounded-md w-full"
        >
          <figcaption>
            <h1 className="text-center text-xl">{question.question}</h1>
          </figcaption>

          <div className="flex justify-center">
            <p className="mx-2">Yes: {question.yes}</p>
            <p className="mx-2">No: {question.no}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex">
              <button className="mx-2" onClick={() => handleClick("yes")}>
                Yes
              </button>
              <button className="mx-2" onClick={() => handleClick("no")}>
                No
              </button>
            </div>
            <div className="italic">
              <h3>By: {question.profileId.userName}</h3>
              <h3>Posted: {new Date(question.createdAt).toLocaleString()}</h3>
            </div>
          </div>
        </figure>
      ) : (
        ""
      )}
    </>
  );
};
