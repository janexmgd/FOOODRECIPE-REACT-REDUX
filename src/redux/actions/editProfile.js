import axios from "axios";
const token = localStorage.getItem("token");

export const editProfile = (form) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${process.env.REACT_APP_MY_BACKEND}/users`, form, {
				headers: {
					token,
					"Content-Type": `multipart/form-data`,
				},
			})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
