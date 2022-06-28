import axios from "axios";
const token = localStorage.getItem("token");

export const addRecipe = (form) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${process.env.REACT_APP_MY_BACKEND}/recipe`, form, {
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
