import { useEffect, useState } from "react";
import { Questions } from "./Questions.jsx";
import { Question } from "./Question.jsx";

export default function Dashboard() {
  // fetched user data from the databank, if any
  const [userData, setUserData] = useState(null);

  // PROFILE
  const [userName, setUserName] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [age, setAge] = useState(null);

  // QUESTIONS
  const [question, setQuestion] = useState(null);
  const [allQuestions, setAllQuestions] = useState(null);

  // PROFILE
  // get user profile data, refresh on every load
  // of the dashboard component (see useEffect)
  async function getProfileData() {
    try {
      const response = await fetch("http://localhost:5000/dashboard");
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setUserData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // post request to update user profile when 'save' button clicked
  // user data is stored in varibale data
  async function handleProfileUpdate(e) {
    e.preventDefault();
    const data = { userName, nationality, age };
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        return console.log("Profile updated!");
      }
      // error or show the response message from the backend
      // to let the user know, what is happening or why it doesn't work
      throw new Error("Profile update failed");
    } catch (err) {
      console.log(err);
    }
  }

  // QUESTIONS
  async function getQuestions() {
    fetch("http://localhost:5000/dashboard")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setAllQuestions(data);

      })
      .catch((err) => console.log(err))
    // const response = await fetch("http://localhost:5000/dashboard");
    // const data = await response.json();
    // if (response.status === 200) {
    //   setAllQuestions(data);
    //   console.log(data[0].Frage);
    // }
  }

  async function handlePostQuestion(e) {
    e.preventDefault();
    const data = { question };
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        return console.log("Frage uploaded!");
      }
      // error or show the response message from the backend
      // to let the user know, what is happening or why it doesn't work
      throw new Error("Frage update failed");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // getProfileData();
    getQuestions();
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "#23272f", color: "white" }}>
        <h2>Navbar</h2>
        <h1>Dashboard</h1>
        {/* {userData ? <h2>Welcome, {userData[0].userName}</h2> : ""} */}
      </div>
      <div style={{ borderBottom: "solid 3px #149eca" }}></div>
      <section
        className="container content"
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#23272f",
          color: "white",
        }}
      >
        <div style={{ widht: "25%" }}>
          <h1 style={{ width: "100%" }}>Fragen der Woche usw.</h1>
          Hier dann eine Componente, die Fragen der Woche abfragt(getRequest)
          und rendert(stylt)
          {allQuestions ? <Question questions={allQuestions} /> : ""}
        </div>
        <div style={{ width: "50%" }}>
          <h1>Feed (andere User, Fragen von Usern)</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "25%" }}>
          {/* label plus input for every property in the profileSchema */}
          <label>
            Username
            <input
              onChange={(e) => {
                setUserName(e.target.value);
                console.log(userName);
              }}
              type="text"
            />
          </label>
          <label>
            Nationality
            <input
              onChange={(e) => {
                setNationality(e.target.value);
                console.log(nationality);
              }}
              type="text"
            />
          </label>
          <label>
            age
            <input
              onChange={(e) => {
                setAge(e.target.value);
                console.log(age);
              }}
              type="text"
            />
          </label>
          <div>
            <button
              onClick={handleProfileUpdate}
              style={{ backgroundColor: "green", color: "white" }}
            >
              save
            </button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "25%" }}>
          <label>
            Question
            <input
              onChange={(e) => {
                setQuestion(e.target.value);
                console.log(question);
              }}
              type="text"
            />
          </label>
          <div>
            <button
              onClick={handlePostQuestion}
              style={{ backgroundColor: "green", color: "white" }}
            >
              save
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// marius@gmail.com
// 1234

// import React from "react";
// import { useState, useEffect, useReducer } from "react";
// import Navigation from "./Navigation";
// import { payInApi, chargeOffApi, getUserApi } from './Api.jsx';

// // const getDate = () => {
// //   const date = new Date();
// //   const locale = date.toLocaleString("de-DE");
// //   return locale;
// // };

// const handleTransactions = (state, action) => {
// //   const reverseTransactions = [...state.transactions].reverse();
// //   switch (action.type) {
// //     case "getData":
// //       return {
// //         amount: action.payload.balance,
// //         transactions: action.payload.transactions,
// //       };
// //     case "updateAmount":
// //       return {
// //         amount: action.payload.balance,
// //         transactions: [
// //           ...reverseTransactions,
// //           {
// //             transaction: action.payload.transaction,
// //             value: action.payload.amount,
// //             date: getDate(),
// //           },
// //         ].reverse(),
// //       };
// //     case "payIn":
// //       if (action.payload === "" || isNaN(action.payload)) return state;
// //       return {
// //         amount: +state.amount + +action.payload,
// //         transactions: [
// //           ...reverseTransactions,
// //           { transaction: "Einzahlung", value: action.payload, date: getDate() },
// //         ].reverse(),
// //       };
// //     case "chargeOff":
// //       if (
// //         +state.amount - +action.payload < 0 ||
// //         action.payload === "" ||
// //         isNaN(action.payload)
// //       )
// //         return state;
// //       return {
// //         amount: +state.amount - +action.payload,
// //         transactions: [
// //           ...reverseTransactions,
// //           { transaction: "Abbuchung", value: action.payload, date: getDate() },
// //         ].reverse(),
// //       };
// //     default:
// //       break;
// //   }
// // };

// // export default function Members() {
//   // const [state, dispatch] = useReducer(handleTransactions, {
//   //   amount: 1000,
//   //   transactions: [],
//   // });
//   // const [payIn, setPayIn] = useState("");
//   // const [chargeOff, setChargeOff] = useState("");

//   // useEffect(() => {
//   //   (async () => {
//   //     const response = await getUserApi();
//   //     dispatch({
//   //       type: "getData",
//   //       payload: {
//   //         balance: response.balance,
//   //         transactions: response.transactions,
//   //       },
//   //     });
//   //   })();
//   // }, []);

//   // const handlePayIn = async () => {
//   //   const response = await payInApi(state.amount + +payIn);
//   //   console.log({ response });
//   //   updateBalance(payIn, "Einzahlung");
//   // };

//   // const handleChargeOff = async () => {
//   //   const response = await chargeOffApi(state.amount - +chargeOff);
//   //   console.log({ response });
//   //   updateBalance(chargeOff, "Abbuchung");
//   // };

//   // const updateBalance = async (amount, transaction) => {
//   //   const response = await getUserApi();
//   //   console.log("Neuer Kontostand", response);
//   //   dispatch({
//   //     type: "updateAmount",
//   //     payload: { balance: response.balance, amount, transaction },
//   //   });
//   // };

//   // console.log(state);

//   return (
//     <div className="contentWrapper">
//       <Navigation />
//       <div className="membersWrapper">
//         {/* <h1>Kontostand: {state.amount} EUR</h1> */}
//         <div className="revenueWrapper">
//           <h3>Umsätze</h3>
//           <ul>
//             {/* {state.transactions.map((obj, index) => (
//               <li key={index}>
//                 <span>
//                   {obj.transaction}: {obj.value} €
//                 </span>
//                 <span>{obj.date}</span>
//               </li>
//             ))} */}
//           </ul>
//         </div>
//         <div className="transactionWrapper">
//           <div className="payIn">
//             <h3>Einzahlen</h3>
//             <label>
//               Betrag eingeben
//               <input
//                 type="text"
//                 // value={payIn}
//                 // onChange={(evt) => setPayIn(evt.target.value)}
//               />
//             </label>
//             {/* <button onClick={() => handlePayIn()}>Bestätigen</button> */}
//           </div>
//           <div className="chargeOff">
//             <h3>Abbuchen</h3>
//             <label>
//               Betrag eingeben
//               {/* <input
//                 type="text"
//                 value={chargeOff}
//                 onChange={(evt) => setChargeOff(evt.target.value)}
//               /> */}
//             </label>
//             {/* <button
//               onClick={() => {
//                 handleChargeOff();
//               }}
//             >
//               Bestätigen
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
