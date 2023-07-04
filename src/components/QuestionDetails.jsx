import { useEffect, useState } from "react";
import {
  deleteLike,
  getQuestion,
  postAnswer,
  postLike,
} from "../fetchRequests/QuestionRequests";
import { useNavigate } from "react-router-dom";

export const QuestionDetails = ({ question, answer, like }) => {
  const [questionData, setQuestionData] = useState(question);
  const [isAnswered, setIsAnswered] = useState(answer);
  const [isLiked, setIsLiked] = useState(like);
  const [yesWidth, setYes] = useState(
    Number(((100 * question.yes) / (question.yes + question.no)).toFixed()) * 2
  );
  const [noWidth, setNo] = useState(
    Number(((100 * question.no) / (question.yes + question.no)).toFixed()) * 2
  );
  const [allAnswers, setAllAnswers] = useState(question.yes + question.no);

  const navigate = useNavigate();

  async function handleAnswerClick(userClick) {
    const userAnswer = userClick;
    const questionId = question._id;
    const data = { questionId, userAnswer };

    await postAnswer(data);
    const updatedData = await getQuestion(question._id);
    setQuestionData(updatedData.found);
    setYes(
      Number(
        (
          (100 * updatedData.found.yes) /
          (updatedData.found.yes + updatedData.found.no)
        ).toFixed()
      ) * 2
    );
    setNo(
      Number(
        (
          (100 * updatedData.found.no) /
          (updatedData.found.yes + updatedData.found.no)
        ).toFixed()
      ) * 2
    );
    setAllAnswers(updatedData.found.yes + updatedData.found.no);
    setIsAnswered(true);
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

  useEffect(() => {});
  return (
    <>
      {questionData ? (
        <figure
          style={{ border: "2px solid #149eca" }}
          className="bg-gray-800 text-white mb-2 rounded-md mx-auto m-2"
        >
          <div className="flex justify-between p-6 flex-wrap">
            <div className="flex flex-wrap">
              <h5>picture</h5>
              <div className="italic ml-2">
                <h5
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/dashboard/${questionData.profileId.userName}/${questionData.profileId._id}`,
                      { state: { question, answer, like } }
                    )
                  }
                  className="textc"
                >
                  {questionData.profileId.userName}
                </h5>

                <h5>
                  {new Date(questionData.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </h5>
              </div>
            </div>
            {!isLiked ? (
              <button
                className="bg-emerald-700"
                onClick={() => handleLikeClick("like")}
              >
                like
              </button>
            ) : (
              <button
                className="bg-red-800"
                onClick={() => handleLikeClick("unlike")}
              >
                unlike
              </button>
            )}
          </div>

          <figcaption className="px-6 pb-6">
            <h1
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/dashboard/question/${questionData.profileId.userName}/${questionData._id}`,
                  { state: { question, answer, like } }
                )
              }
              className="text-start text-2xl"
            >
              {questionData.question}
            </h1>
          </figcaption>
          {isAnswered ? (
            <div className="italic text-white">Answers: {allAnswers}</div>
          ) : (
            ""
          )}

          {!isAnswered ? (
            <div className="flex text-black text-xl">
              <button
                style={{ width: "100%" }}
                className="bg-green-400"
                onClick={() => handleAnswerClick("yes")}
              >
                Yes
              </button>
              <button
                style={{ width: "100%" }}
                className="bg-red-400"
                onClick={() => handleAnswerClick("no")}
              >
                No
              </button>
            </div>
          ) : (
            <div className="flex text-black text-xl text-center">
              <div style={{ width: `${yesWidth}%` }} className="bg-green-400">
                {yesWidth / 2 + "%"}
              </div>
              <div style={{ width: `${noWidth}%` }} className="bg-red-400">
                {noWidth === 0 ? "" : noWidth / 2 + "%"}
              </div>
            </div>
          )}
        </figure>
      ) : (
        ""
      )}
    </>
  );
};
