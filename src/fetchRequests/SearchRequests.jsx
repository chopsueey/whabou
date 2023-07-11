export async function searchRequest(userInput) {
  try {
    const response = await fetch(`http://localhost:5000/dashboard/search/?s=${userInput}`, {
      credentials: "include",
    });
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}
