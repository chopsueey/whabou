import { useState } from "react";
import { Question } from "./Question";

export const Questions = ({ questions, answers, likes }) => {
  const answeredQuestions = answers.map((id) => id.question);
  const likedQuestions = likes.map((id) => id.question);
  return (
    <div>
      {questions
        ? questions.map((item) => {
            let userAnswer = false;
            let userLike = false;
            for (let i = 0; i < answeredQuestions.length; i++) {
              if (answeredQuestions[i] === item._id) {
                userAnswer = true;
                break;
              }
            }
            for (let i = 0; i < likedQuestions.length; i++) {
              if (likedQuestions[i] === item._id) {
                userLike = true;
                break;
              }
            }
            return (
              <Question key={item._id} question={item} answer={userAnswer} like={userLike} />
            );
          })
        : ""}
    </div>
  );
};
