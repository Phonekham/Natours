// import axios from "axios";

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/login",
      data: {
        email,
        password
      }
    });
    if (res.data.status === "success") {
      alert("LogIn successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
    // console.log(res);
  } catch (e) {
    alert(e.response.data.message);
  }
};

document.querySelector(".form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});