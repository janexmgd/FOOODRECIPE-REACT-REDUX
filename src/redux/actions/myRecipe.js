import axios from "axios";
const token = localStorage.getItem("token");
export const getMyrecipe = () => {
  return {
    type: "GET_MY_RECIPE",
    payload: axios({
      url: `${process.env.REACT_APP_MY_BACKEND}/recipe/users/my_recipe`,
      method: "GET",
      headers: { token: token },
    }),
  };
};
