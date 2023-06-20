import { useEffect, useState } from "react";
import { Questions } from "./Questions";

export default function QuestionsOfWeek() {
  const [allQuestions, setAllQuestions] = useState(null);

  async function getQuestions() {
    const response = await fetch(
      "http://localhost:5000/dashboard/myquestions",
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setAllQuestions(data);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <section className="row most-clicked">
      <h1 style={{ width: "100%" }}>Questions of the week</h1>
      {allQuestions ? <Questions questions={allQuestions} /> : ""}
    </section>
  );
}
