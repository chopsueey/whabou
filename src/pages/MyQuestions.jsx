import { useState } from "react";
import { postQuestion } from "../fetchRequests/QuestionRequests";

export default function MyQuestions() {
  const [question, setQuestion] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState({
    question1: false,
    question2: false,
    question3: false,
  });

  async function handlePostQuestion(e) {
    e.preventDefault();
    setSaveLoading(true);
    const data = { question };
    await postQuestion(data);
    setSaveLoading(false);
  }

  const handleQuestionClick = (questionKey) => {
    setIsContentVisible((prevState) => ({
      ...prevState,
      [questionKey]: !prevState[questionKey],
    }));
  };

  return (
    <div className="flex items-center justify-center mt-5 mb-5">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-md shadow-md">
        <h3
          className={`cursor-pointer text-white mb-2 ${
            isContentVisible.question1 ? "font-bold" : ""
          }`}
          onClick={() => handleQuestionClick("question1")}
        >
          Was könnte ich fragen?
        </h3>
        {isContentVisible.question1 && (
          <>
            <p>Nervt euch der Sommer?</p>
            <p>
              Sollte meine Katze als Präsidentschaftskandidat nominiert werden?{" "}
            </p>
            <p>Sollte man vegetarisch leben?</p>
          </>
        )}
        <h3
          className={`cursor-pointer text-white mb-2 ${
            isContentVisible.question2 ? "font-bold" : ""
          }`}
          onClick={() => handleQuestionClick("question2")}
        >
          Wie erstelle ich eine Frage?
        </h3>
        {isContentVisible.question2 && (
          <p>
            Nachdem du dich für eine Frage entschieden hast, klickst du unten
            einfach in das Eingabefeld und erstellst deine Frage. Bitte beachte,
            das ein Wort maximal 15 Buchstaben enthalten darf und die
            Gesamtfrage nicht mehr als 1000 Zeichen haben sollte.
          </p>
        )}
        <h2 className="mb-4 text-xl font-semibold text-center text-white">
          Question
        </h2>
        <input
          onChange={(e) => {
            setQuestion(e.target.value);
            console.log(question);
          }}
          type="text"
          className="w-full p-4 rounded-md shadow-md mb-4 text-gray-800"
        />
        <button
          onClick={handlePostQuestion}
          className={`text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg font-medium rounded-lg text-medium px-5 py-1 w-full ${
            saveLoading ? "cursor-not-allowed opacity-75" : ""
          }`}
          disabled={saveLoading}
        >
          {saveLoading ? (
            <div className="flex items-center justify-center">
              <div className="mr-2 animate-spin">
                <svg
                  className="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 12a4 4 0 1 1-8 0m8 0H8" />
                </svg>
              </div>
              Saving...
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}
