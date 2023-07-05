import { useLocation } from "react-router-dom";
import { QuestionDetails } from "../components/QuestionDetails";

export function QuestionPage() {
  const { state } = useLocation();
  const { question, answer, like } = state;
  return <QuestionDetails question={question} answer={answer} like={like} />;
}
