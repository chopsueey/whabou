import { useState } from "react";
import GeneralStore from "../store/GeneralContext";

export default function MyQuestions() {
  const [question, setQuestion] = useState(null);

  async function handlePostQuestion(e) {
    e.preventDefault();
    const data = { question };
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/myquestions",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 201) {
        return console.log("Frage uploaded!");
      }
      // error or show the response message from the backend
      // to let the user know, what is happening or why it doesn't work
      throw new Error("Frage update failed");
    } catch (err) {
      console.log(err);
    }
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
