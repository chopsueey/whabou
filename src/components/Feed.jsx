import { useEffect, useState } from "react";
import { Questions } from "./Questions";

export default function Feed() {
  const [sortedQuestions, setSortedQuestions] = useState(null);
  const [sortBy, setSortBy] = useState("latest");

  async function requestFeed() {
    const response = await fetch(
      `http://localhost:5000/dashboard/feed/sort/?sortBy=${sortBy}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      setSortedQuestions(data.found);
    }
  }
  useEffect(() => {
    requestFeed();
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
          <option value="last24Hours">24 hoursblabal</option>
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
