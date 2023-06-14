import { createContext, useContext, useState } from "react";

// creating a Context to store variables
// that are shared in main.jsx to all it's children
// they can be accessed via 'const {variablename} = GeneralStore()'
// in other components
const InitialContext = createContext();

export function GeneralContext({ children }) {
    // stored variables
  const [modal, setModal] = useState(false);
  const sharedData = { modal, setModal };

  return (
    <InitialContext.Provider value={sharedData}>
      {children}
    </InitialContext.Provider>
  );
}

const GeneralStore = () => useContext(InitialContext);
export default GeneralStore;
