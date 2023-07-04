import { useState } from "react";
import { postQuestion } from "../fetchRequests/QuestionRequests";
import GeneralStore from "../store/GeneralContext";

export default function MyQuestions() {
  const { setActiveTab } = GeneralStore()

  const [question, setQuestion] = useState(null);

  async function handlePostQuestion(e) {
    e.preventDefault();
    const data = { question };
    await postQuestion(data);
    setActiveTab("Feed")
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "25%" }}>
      <label>
        Question
        <input
          onChange={(e) => {
            setQuestion(e.target.value);
            console.log(question);
          }}
          type="text"
        />
      </label>
      <div>
        <button
          onClick={handlePostQuestion}
          style={{ backgroundColor: "green", color: "white" }}
        >
          save
        </button>
      </div>
    </div>
  );
}
