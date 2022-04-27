import axios from "axios";
export const getLatestRecipe = () => {
  return {
    type: "GET_LATEST_RECIPE",
    payload: axios({
      url: `${process.env.REACT_APP_MY_BACKEND}/recipe/all/latest`,
      method: "GET",
    }),
  };
};
