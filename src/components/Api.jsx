export const registerApi = async (data) => {
    try {
        const response = await fetch("http://localhost:5000/api/user/register",{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        });

        if (response.status === 201){
            return console.log("Registrierung erfolgreich!");
        };
        throw new Error("Registrierung fehlgeschlagen!");
    } catch (error) {
        console.log(error);
    }
}

export const loginApi = async (data) => {
    try {
        const response = await fetch("http://localhost:5000/api/user/login",{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            },
            credentials: "include"
        });
        const userData = await response.json();
        if (response.status === 200){
            console.log("Anmeldung erfolgreich!");
            return userData;
        };
        throw new Error("Anmeldung fehlgeschlagen!");
    } catch (error) {
        console.log(error);
    }
}

// export const payInApi = async (newBalance) => {
//     try {
//         const response = await fetch("http://localhost:5000/api/user/transaction/postMoney",{
//             method: "PATCH",
//             body: JSON.stringify({balance:newBalance}),
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             credentials: "include"
//         });
//         const userData = await response.json();
//         if (response.status === 200){
//             console.log("Einzahlung erfolgreich!");
//             return userData;
//         };
//         throw new Error("Einzahlung fehlgeschlagen!");
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const chargeOffApi = async (newBalance) => {
//     try {
//         const response = await fetch("http://localhost:5000/api/user/transaction/getMoney",{
//             method: "PATCH",
//             body: JSON.stringify({balance:newBalance}),
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             credentials: "include"
//         });
//         const userData = await response.json();
//         if (response.status === 200){
//             console.log("Abbuchung erfolgreich!");
//             return userData;
//         };
//         throw new Error("Abbuchung fehlgeschlagen!");
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getUserApi = async () => {
//     try {
//         const response = await fetch("http://localhost:5000/api/user/data",{
//             credentials: "include"
//         });
//         const data = await response.json();
//         if (response.status === 200){
//             console.log("Daten abgerufen!");
//             return {balance:data.balance, transactions:data.transactions};
//         };
//         throw new Error("Datenabruf fehlgeschlagen!");
//     } catch (error) {
//         console.log(error);
//     }
// }

