import axios from "axios";
const token = localStorage.getItem("token");
export const onDelete = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_MY_BACKEND}/recipe/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err.data.data);
      });
  });
};
