import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import { getQuestions } from "../fetchRequests/QuestionRequests";

export default function QuestionsOfWeek() {
  const [allQuestions, setAllQuestions] = useState(null);

  useEffect(() => {
    (async function request() {
      setAllQuestions(await getQuestions());
    })();
  }, []);

  return (
    <div className="row most-clicked">
      {/* {allQuestions ? <Questions questions={allQuestions} /> : ""} */}
      {allQuestions && allQuestions.length > 0 ? (
        <Questions questions={allQuestions} />
      ) : (
        <h2 className="text-center">Nothing found :/</h2>
      )}
    </div>
  );
}
