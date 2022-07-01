import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../assets/styles/editrecipe.module.css";

import Img from "../assets/images/photo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getDetailRecipe } from "../redux/actions/getDetailRecipe";
import swal from "sweetalert2";
import { toastr } from "../utils/toastr";
import { Code } from "react-content-loader";
import { editRecipe } from "../redux/actions/editRecipe";

const EditRecipe = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		photo: "",
		title: "",
		ingredients: "",
		video: "",
	});
	const [photo, setPhoto] = useState(null);
	const dispatch = useDispatch();
	const { id } = useParams();
	const detailRecipe = useSelector((state) => {
		return state.detailRecipe;
	});
	useEffect(() => {
		if (detailRecipe.data) {
			setForm({
				title: detailRecipe.data.title,
				ingredients: detailRecipe.data.ingredients,
				video: detailRecipe.data.video,
			});
			setPhoto(detailRecipe.data.photo);
		}
	}, [detailRecipe]);

	useEffect(() => {
		dispatch(getDetailRecipe(id));
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		const data = new FormData();
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
		} else {
			swal
				.fire({
					title: "Edit this recipe",
					text: "Are you sure to edit this recipe?",
					icon: "question",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, I Sure!",
				})
				.then(async (editedRecipe) => {
					try {
						if (editedRecipe.isConfirmed) {
							const res = await editRecipe(data, id);
							swal
								.fire({
									title: "Success!",
									text: res.message,
									icon: "success",
								})
								.then(() => {
									navigate("/profile");
								});
						} else {
							setLoading(false);
						}
					} catch (err) {
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
					}
				});
		}
	};

	return (
		<>
			<div>
				<Navbar />
			</div>
			{detailRecipe.isLoading === true ? (
				<Code />
			) : detailRecipe.isError === true ? (
				<div>Error</div>
			) : (
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
											id="image"
											onChange={(e) => {
												setPhoto(e.target.files[0]);
											}}
										/>
										{photo === detailRecipe.data.photo ? (
											<label className="custom-file-label" htmlFor="image">
												{detailRecipe.data.photo}
											</label>
										) : (
											<label className="custom-file-label" htmlFor="image">
												{detailRecipe.data.photo}
											</label>
										)}
									</div>
									<div className={styles.formTitle}>
										<input
											placeholder="title"
											className={styles.formTitleInput}
											type="text"
											onChange={(e) =>
												setForm({ ...form, title: e.target.value })
											}
											value={form.title}
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
											value={form.ingredients}
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
											value={form.video}
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
										<button type="submit">Save changes</button>
									)}
								</div>
							</form>
						</div>
					</section>
				</div>
			)}
			<div>
				<Footer />
			</div>
		</>
	);
};

export default EditRecipe;
