import axios from "axios";
const token = localStorage.getItem("token");
export const getDetailRecipe = (id) => {
  return {
    type: "GET_DETAIL_RECIPE",
    payload: axios({
      url: `${process.env.REACT_APP_MY_BACKEND}/recipe/${id}`,
      method: "GET",
      headers: { token: token },
    }),
  };
};
