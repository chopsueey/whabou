import { createContext, useContext, useState } from "react";

// creating a Context to store variables
// that are shared in main.jsx to all it's children
// they can be accessed via 'const {variablename} = GeneralStore()'
// in other components
const InitialContext = createContext();

export function GeneralContext({ children }) {
  // stored variables
  const [hasCookie, setHasCookie] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // dashboard active tab
  const [activeTab, setActiveTab] = useState("Feed");

  const sharedData = { modal, setModal, hasCookie, setHasCookie, isLoading, setIsLoading, activeTab, setActiveTab };

  return (
    <InitialContext.Provider value={sharedData}>
      {children}
    </InitialContext.Provider>
  );
}

const GeneralStore = () => useContext(InitialContext);
export default GeneralStore;
