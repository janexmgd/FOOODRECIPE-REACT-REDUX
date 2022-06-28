import axios from "axios";

export const OnLogin = (form) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${process.env.REACT_APP_MY_BACKEND}/auth/login`, form)
			.then((response) => {
				// console.log(response);
				localStorage.setItem("token", response.data.token);
				// localStorage.setItem("user", JSON.stringify(response.data.data.user));

				resolve(response.data);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
export const OnRegister = (form) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${process.env.REACT_APP_MY_BACKEND}/auth/register`, form, {
				headers: {
					"Content-Type": `multipart/form-data`,
				},
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
				// console.log(err);
			});
	});
};
