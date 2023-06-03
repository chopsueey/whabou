import { Frage } from "./Frage";

export const Fragen = ({ fragen }) => {
  return (
    <div>
      {fragen
        ? fragen.map((item) => {
            return <Frage key={item._id} frage={item} />;
          })
        : ""}
    </div>
  );
};
