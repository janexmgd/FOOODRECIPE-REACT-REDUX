import axios from "axios";
const token = localStorage.getItem("token");

export const editRecipe = (form, id) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${process.env.REACT_APP_MY_BACKEND}/recipe/${id}`, form, {
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
