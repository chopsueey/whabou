import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import { getFeed } from "../fetchRequests/QuestionRequests";

export default function Feed() {
  const [sortedQuestions, setSortedQuestions] = useState(null);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    (async function request() {
      setSortedQuestions(await getFeed(sortBy));
    })();
  }, [sortBy]);
  
  return (
    <div className="row feed">
      <div className="flex justify-end">
        <select
          className="bg-black"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="latest">latest</option>
          <option value="lastHour">one hour</option>
          <option value="last12Hours">12 hours</option>
          <option value="last24Hours">24 hours</option>
        </select>
      </div>
      {sortedQuestions && sortedQuestions.length > 0 ? (
        <Questions questions={sortedQuestions} />
      ) : (
        <h2 className="text-center">Nothing found :/</h2>
      )}
    </div>
  );
}
