export const Question = ({ question }) => {
  async function handleYesClick() {
    fetch(`http://localhost:5000/dashboard/${question._Id}`, {
      credentials: "include",
    });
  }
  function handleNoClick() {}

  return (
    <>
      {question ? (
        <div style={{ border: "1px solid white" }} className="p-3">
          <h1 className="text-center text-xl">{question.question}</h1>

          <div className="flex justify-center">
            <p className="mx-2">Yes: {question.yes}</p>
            <p className="mx-2">No: {question.no}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <button className="mx-2" onClick={handleYesClick}>
                Yes
              </button>
              <button className="mx-2" onClick={handleNoClick}>
                No
              </button>
            </div>
            <div className="italic">
              <h3>By: {question.userId.name}</h3> 
              <h3>Posted: {new Date(question.createdAt).toLocaleString()}</h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
