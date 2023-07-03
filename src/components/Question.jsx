import { useState } from "react";
import {
  deleteLike,
  getQuestion,
  postAnswer,
  postLike,
} from "../fetchRequests/QuestionRequests";

export const Question = ({ question, answer, like }) => {
  const [questionData, setQuestionData] = useState(question);
  const [isAnswered, setIsAnswered] = useState(answer);
  const [isLiked, setIsLiked] = useState(like);

  async function handleAnswerClick(userClick) {
    const userAnswer = userClick;
    const questionId = question._id;
    const data = { questionId, userAnswer };

    await postAnswer(data);
    setIsAnswered(true);
    const updatedData = await getQuestion(question._id);
    setQuestionData(updatedData.found);
  }

  async function handleLikeClick(likeOrUnlike) {
    const questionId = question._id;
    // request postLike() or deleteLike()
    if (likeOrUnlike === "like") {
      const response = await postLike({ questionId });
      setIsLiked(true);

      const updatedData = await getQuestion(questionId);
      setQuestionData(updatedData.found);
    } else {
      const response = await deleteLike({ questionId });
      setIsLiked(false);

      const updatedData = await getQuestion(questionId);
      setQuestionData(updatedData.found);
    }
  }
  return (
    <>
      {questionData ? (
        <figure
          style={{ border: "2px solid #149eca" }}
          className="p-3 bg-gray-800 text-white mb-2 rounded-md mx-auto m-2"
        >
          <div>profilepicture</div>
          <figcaption>
            <h1 className="text-center text-2xl">{questionData.question}</h1>
          </figcaption>

          {!isAnswered ? (
            <div className="flex flex-col sm:flex-row justify-center">
              <button className="mx-2" onClick={() => handleAnswerClick("yes")}>
                Yes
              </button>
              <button className="mx-2" onClick={() => handleAnswerClick("no")}>
                No
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <p className="mx-2">Yes: {questionData.yes}</p>
              <p className="mx-2">No: {questionData.no}</p>
            </div>
          )}
          <div className="flex justify-between">
            {!isLiked ? (
              <div>
                <button
                  className="bg-emerald-700"
                  onClick={() => handleLikeClick("like")}
                >
                  like
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="bg-red-800"
                  onClick={() => handleLikeClick("unlike")}
                >
                  unlike
                </button>
              </div>
            )}

            <div className="italic mt-2 lg:mt-0">
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
