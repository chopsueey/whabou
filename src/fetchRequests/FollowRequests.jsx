export async function postFollow() {
  try {
    fetch("http://localhost:5000/dashboard/profile/follow");
  } catch (err) {
    console.log(err);
  }
}
