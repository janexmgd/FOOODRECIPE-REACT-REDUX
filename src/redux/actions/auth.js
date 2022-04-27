import axios from "axios";

export const OnLogin = (form) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_MY_BACKEND}/login`, form)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        resolve(response.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const OnRegister = (form) => {
  console.log("hi");
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_MY_BACKEND}/register`, form, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
