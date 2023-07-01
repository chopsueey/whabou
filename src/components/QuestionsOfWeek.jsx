import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import { getQuestions } from "../fetchRequests/QuestionRequests";

export default function QuestionsOfWeek() {
  const [allQuestions, setAllQuestions] = useState(null);
  const [answersOfUser, setAnswersOfUser] = useState(null);
  const [likesOfUser, setLikesOfUser] = useState(null)

  useEffect(() => {
    (async function request() {
      const feed = await getQuestions();
      setAllQuestions(feed.found);
      setAnswersOfUser(feed.userAnswers);
      setLikesOfUser(feed.userLikes)
    })();
  }, []);

  return (
    <div className="row most-clicked">
      {/* {allQuestions ? <Questions questions={allQuestions} /> : ""} */}
      {allQuestions && allQuestions.length > 0 ? (
        <Questions questions={allQuestions} answers={answersOfUser} likes={likesOfUser} />
      ) : (
        <h2 className="text-center">Nothing found :/</h2>
      )}
    </div>
  );
}
