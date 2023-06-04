export const Question = ({ question }) => {
  async function handleYesClick() {
    fetch(`http://localhost:5000/dashboard/${question._Id}`);
  }
  function handleNoClick() {}
  return (
    <>
      {question ? (
        <div>
          <h1>{question.Frage}</h1>
          <p>Ja{question.Ja}</p>
          <p>Nein{question.Nein}</p>
          <button onClick={handleYesClick}>Ja</button>
          <button onClick={handleNoClick}>Nein</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
