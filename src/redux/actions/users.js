import axios from "axios";
import jwtDecode from "jwt-decode";
const token = localStorage.getItem("token");

export const getDetailUser = () => {
	if (token) {
		const decode = jwtDecode(token);
		const { id } = decode;
		return {
			type: "GET_DETAIL_USER",
			payload: axios({
				url: `${process.env.REACT_APP_MY_BACKEND}/users/${id}`,
				method: "GET",
				headers: { token },
			}),
		};
	}
};
