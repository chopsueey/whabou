import { Question } from "./Question";

export const Questions = ({ questions }) => {
  return (
    <div>
      {questions
        ? questions.map((item) => {
            return <Question key={item._id} question={item} />;
          })
        : ""}
    </div>
  );
};
