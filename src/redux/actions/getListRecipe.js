import axios from "axios";
const token = localStorage.getItem("token");
export const getListRecipe = (searchQuery, sortQuery, page) => {
	return {
		type: "GET_LIST_RECIPE",
		payload: axios({
			url: `${process.env.REACT_APP_MY_BACKEND}/recipe?search=${searchQuery}&sort=${sortQuery}&limit=6&page=${page}`,
			method: "GET",
			headers: { token: token },
		}),
	};
};
