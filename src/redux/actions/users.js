import axios from "axios";
import jwtDecode from "jwt-decode";
const token = localStorage.getItem("token");
const decode = jwtDecode(token);

export const getDetailUser = () => {
	const { id } = decode;
	return {
		type: "GET_DETAIL_USER",
		payload: axios({
			url: `${process.env.REACT_APP_MY_BACKEND}/users/${id}`,
			method: "GET",
			headers: { token },
		}),
	};
};
