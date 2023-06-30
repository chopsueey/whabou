import { useState } from "react";
import { postQuestion } from "../fetchRequests/QuestionRequests";

export default function MyQuestions() {
  const [question, setQuestion] = useState(null);

  async function handlePostQuestion(e) {
    e.preventDefault();
    const data = { question };
    postQuestion(data)
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
          Save
        </button>
      </div>
    </div>
  );
}
