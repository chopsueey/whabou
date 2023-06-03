export const Frage = ({ frage }) => {
  async function handleYesClick() {
    fetch(`http://localhost:5000/dashboard/${fragen._Id}`);
  }
  function handleNoClick() {}
  return (
    <div>
      <h1>{frage.Frage}</h1>
      <p>Ja{frage.Ja}</p>
      <p>Nein{frage.Nein}</p>
      <button onClick={handleYesClick}>Ja</button>
      <button onClick={handleNoClick}>Nein</button>
    </div>
  );
};
