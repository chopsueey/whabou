import { useEffect, useState } from "react";
import {
  deleteAnswer,
  deleteLike,
  getQuestion,
  postAnswer,
  postLike,
} from "../fetchRequests/QuestionRequests";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";
import {
  deleteFollow,
  getFollower,
  postFollow,
} from "../fetchRequests/FollowRequests";

export const Question = ({
  question,
  answer,
  like,
  isFollowing,
  followsUser,
}) => {
  const [questionData, setQuestionData] = useState(question);
  const [isAnswered, setIsAnswered] = useState(answer);
  const [isLiked, setIsLiked] = useState(like);
  const [isFollowed, setIsFollowed] = useState(isFollowing);
  const [followsYou, setFollowsYou] = useState(followsUser);
  const [isOwnQuestion, setIsOwnQuestion] = useState(undefined);
  const [showWindow, setShowWindow] = useState(false);

  const [numOfFollower, setNumOfFollower] = useState(undefined);

  // calculate percentage of yes or no
  // multiplied by two, because yes and no take half of the place of the div element
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

  async function handleDeleteClick() {
    const questionId = question._id;
    const response = await deleteAnswer({ questionId });
    const responseData = await response.json();
    setIsAnswered(false);
  }

  async function handleFollowClick() {
    const followingProfileId = questionData.profileId._id;
    const data = { followingProfileId };
    const response = await postFollow(data);
    setIsFollowed(true);
    window.location.reload();
  }

  async function handleUnfollowClick() {
    const followingProfileId = questionData.profileId._id;
    const data = { followingProfileId };
    const response = await deleteFollow(data);
    setIsFollowed(false);
    window.location.reload();
  }

  const handleMouseEnter = async () => {
    const response = await getFollower(questionData.profileId._id);
    setNumOfFollower(response.followingThisProfile.length);
    // check if the profile of the question asker
    // is the same as the current user, so that the user
    // can't follow himself
    response.userProfileId._id === questionData.profileId._id
      ? setIsOwnQuestion(true)
      : setIsOwnQuestion(false);
    setShowWindow(true);
  };

  const handleMouseLeave = () => {
    setShowWindow(false);
  };

  return (
    <>
      {questionData ? (
        <figure
          onMouseLeave={handleMouseLeave}
          style={{ border: "2px solid #149eca", maxWidth: "600px" }}
          className="bg-gray-800 text-white mb-2 rounded-md mx-auto m-2"
        >
          <div className="flex justify-between p-6 flex-wrap">
            <div
              className="flex flex-wrap question-userName relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                onClick={() =>
                  navigate(
                    `/dashboard/${questionData.profileId.userName}/profile/${questionData.profileId._id}`,
                    { state: { question, answer, like } }
                  )
                }
                style={{
                  backgroundImage: `url(${profilePic})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                }}
              >
                .....
              </div>
              <div className="italic ml-2">
                <h5
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/dashboard/${questionData.profileId.userName}/profile/${questionData.profileId._id}`,
                      { state: { question, answer, like } }
                    )
                  }
                  className="text-cyan-200 hover:underline"
                >
                  {questionData.profileId.userName}
                </h5>
              </div>
              {showWindow ? (
                <div
                  onMouseLeave={handleMouseLeave}
                  style={{ width: "115px" }}
                  className="absolute bottom-6 bg-gray-950 border-2 rounded-lg p-2 text-sm text-center flex flex-col"
                >
                  <div>Followers: {numOfFollower}</div>
                  {followsYou ? (
                    <div className="text-xs">
                      <h1 className="text-cyan-200">(Follows you)</h1>
                    </div>
                  ) : (
                    ""
                  )}
                  {isOwnQuestion ? (
                    ""
                  ) : (
                    <div className="mt-4">
                      {!isFollowed ? (
                        <button
                          className="text-green-400"
                          onClick={handleFollowClick}
                        >
                          Follow
                        </button>
                      ) : (
                        <button
                          className="text-red-400"
                          onClick={handleUnfollowClick}
                        >
                          Unfollow
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            {!isLiked ? (
              <button onClick={() => handleLikeClick("like")}>
                {questionData.likes + " 🤍"}
              </button>
            ) : (
              <button onClick={() => handleLikeClick("unlike")}>
                {questionData.likes + " 💙"}
              </button>
            )}
          </div>

          <figcaption className="p-6">
            <h1
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/dashboard/question/${questionData.profileId.userName}/${questionData._id}`,
                  { state: { question, answer, like } }
                )
              }
              className="text-center text-2xl"
            >
              {questionData.question}
            </h1>
          </figcaption>

          <div className="text-xs textc text-end px-6 pb-6">
            <span>
              {new Date(questionData.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {isAnswered ? (
              <>
                <div className="italic">Answers: {allAnswers}</div>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={handleDeleteClick}
                  className="italic text-red-400 hover:underline text-end"
                >
                  delete Answer
                </span>
              </>
            ) : (
              ""
            )}
          </div>

          {!isAnswered ? (
            <div className="flex text-black text-lg">
              <button
                style={{ width: "100%" }}
                className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br "
                onClick={() => handleAnswerClick("yes")}
              >
                Yes
              </button>
              <button
                style={{ width: "100%" }}
                className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600"
                onClick={() => handleAnswerClick("no")}
              >
                No
              </button>
            </div>
          ) : (
            <div className="flex text-black text-lg text-center">
              <div style={{ width: `${yesWidth}%` }} className="bg-cyan-600">
                {yesWidth / 2 + "%"}
              </div>
              <div style={{ width: `${noWidth}%` }} className="bg-gray-500">
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
