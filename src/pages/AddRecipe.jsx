/* eslint-disable no-useless-return */
import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../assets/styles/addrecipe.module.css";

import Img from "../assets/images/photo.svg";
import { useNavigate } from "react-router-dom";

import { addRecipe } from "../redux/actions/addRecipe";
import swal from "sweetalert2";
import { toastr } from "../utils/toastr";

const AddRecipe = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		photo: "",
		title: "",
		ingredients: "",
		video: "",
	});
	const [photo, setPhoto] = useState(null);
	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		const data = new FormData();
		data.append("photo", form.photo);
		data.append("title", form.title);
		data.append("ingredients", form.ingredients);
		data.append("video", form.video);
		if (photo) {
			data.append("photo", photo);
		}
		if (form.title === "" || form.ingredients === "" || form.video === "") {
			swal.fire({
				title: "Error!",
				text: "form cannot be empty",
				icon: "error",
			});
			setLoading(false);
			return;
		} else {
			addRecipe(data)
				.then((res) => {
					swal
						.fire({
							title: "Success!",
							text: res.message,
							icon: "success",
						})
						.then(() => {
							navigate("/profile");
						});
				})
				.catch((err) => {
					console.log(err);
					if (err.response?.data?.message === "failed in validation") {
						const error = err.response.data.error;
						error.map((e) => toastr(e, "error"));
						setLoading(false);
					} else {
						swal.fire({
							title: "Error!",
							text: err.response?.data?.message,
							icon: "error",
						});
						setLoading(false);
					}
				});
		}
	};
	return (
		<>
			<div>
				<Navbar />
			</div>
			<div className={styles.container}>
				<section>
					<div>
						<form onSubmit={(e) => onSubmit(e)}>
							<div className={styles.jumbotron}>
								<div className={styles.formPhoto}>
									<img src={Img} className={styles.formPhotoImg} alt="" />
									<input
										className={styles.formPhotoInput}
										type="file"
										accept=".png, .jpg"
										onChange={(e) => {
											setPhoto(e.target.files[0]);
										}}
									/>
								</div>
								<div className={styles.formTitle}>
									<input
										placeholder="title"
										className={styles.formTitleInput}
										type="text"
										onChange={(e) =>
											setForm({ ...form, title: e.target.value })
										}
									/>
								</div>
								<div className={styles.formIngredients}>
									<textarea
										placeholder="Ingredients"
										cols="30"
										rows="10"
										onChange={(e) =>
											setForm({ ...form, ingredients: e.target.value })
										}
									></textarea>
								</div>
								<div className={styles.formVideo}>
									<input
										placeholder="Video"
										type="text"
										onChange={(e) =>
											setForm({
												...form,
												video: e.target.value,
											})
										}
									/>
								</div>
								{loading ? (
									<button type="submit">
										<span
											className="spinner-border spinner-border-sm"
											role="status"
											aria-hidden="true"
										/>
									</button>
								) : (
									<button type="submit">Post</button>
								)}
							</div>
						</form>
					</div>
				</section>
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
};

export default AddRecipe;
