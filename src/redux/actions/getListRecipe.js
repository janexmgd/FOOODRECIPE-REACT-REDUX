import axios from "axios";
const token = localStorage.getItem("token");
export const getListRecipe = (param) => {
  console.log(param);
  return {
    type: "GET_LIST_RECIPE",
    payload: axios({
      url: `${process.env.REACT_APP_MY_BACKEND}/recipe?search=${param}`,
      method: "GET",
      headers: { token: token },
    }),
  };
};
