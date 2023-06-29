import { useEffect, useState } from "react";
import {
  checkAnswer,
  getFeed,
  getQuestion,
  postAnswer,
} from "../fetchRequests/QuestionRequests";

export const Question = ({ question }) => {
  const [questionData, setQuestionData] = useState(question);
  const [isAnswered, setIsAnswered] = useState(false);
  async function handleClick(answer) {
    const userAnswer = answer;
    const questionId = question._id;
    const data = { questionId, userAnswer };
    const response = await postAnswer(data);
    const responseData = await response.json();
    console.log(responseData);
    const updatedData = await getQuestion(question._id);
    setQuestionData(updatedData);
  }

  useEffect(() => {
    (async function request() {
      const response = await checkAnswer(question._id);
      if (response) {
        setIsAnswered(true);
      }
    })();
  }, []);

  return (
    <>
      {questionData ? (
        <figure
          style={{ border: "2px solid #149eca" }}
          className="p-3 bg-gray-800 text-white mb-2 rounded-md w-1/2 mx-auto"
        >
          <figcaption>
            <h1 className="text-center text-xl">{questionData.question}</h1>
          </figcaption>

          <div className="flex justify-center">
            <p className="mx-2">Yes: {questionData.yes}</p>
            <p className="mx-2">No: {questionData.no}</p>
          </div>

          <div className="flex justify-between">
            {!isAnswered ? (
              <div className="flex">
                <button className="mx-2" onClick={() => handleClick("yes")}>
                  Yes
                </button>
                <button className="mx-2" onClick={() => handleClick("no")}>
                  No
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="italic">
              <h3>By: {questionData.profileId.userName}</h3>
              <h3>
                Posted: {new Date(questionData.createdAt).toLocaleString()}
              </h3>
            </div>
          </div>
        </figure>
      ) : (
        ""
      )}
    </>
  );
};
