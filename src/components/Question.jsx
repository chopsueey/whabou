import { useState } from "react";
import { postAnswer } from "../fetchRequests/QuestionRequests";

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
    await postAnswer(data);
  }

  return (
    <>
      {question ? (
        <figure
          style={{ border: "2px solid #149eca" }}
          className="p-3 bg-gray-800 text-white mb-2 rounded-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto m-2"
        >
          <figcaption>
            <h1 className="text-center text-xl">{question.question}</h1>
          </figcaption>

          <div className="flex justify-center">
            <p className="mx-2">Yes: {question.yes}</p>
            <p className="mx-2">No: {question.no}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex">
              <button className="mx-2" onClick={() => handleClick("yes")}>
                Yes
              </button>
              <button className="mx-2" onClick={() => handleClick("no")}>
                No
              </button>
            </div>
            <div className="italic mt-2 lg:mt-0">
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
