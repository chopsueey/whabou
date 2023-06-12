export const Question = ({ question }) => {
  async function handleYesClick() {
    fetch(`http://localhost:5000/dashboard/${question._Id}`);
  }
  function handleNoClick() {}
  // changed the questionModel to english words
  // and therefore changed the new keys here accordingly
  return (
    <>
      {question ? (
        <div>
          <h1>{question.question}</h1>
          <p>Yes: {question.yes}</p>
          <p>No: {question.no}</p>
          <button onClick={handleYesClick}>Yes</button>
          <button onClick={handleNoClick}>No</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
