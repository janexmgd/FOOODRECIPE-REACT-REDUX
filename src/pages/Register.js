/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Decoration from "../components/Decoration";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { toastr } from "../../src/utils/toastr";
import { OnRegister } from "../redux/actions/auth";

const Register = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [photo, setPhoto] = useState(null);
	const onSubmit = (e) => {
		setLoading(true);
		e.preventDefault();
		// console.log(form);
		if (form.name === "") {
			swal.fire({
				title: "Error!",
				text: "Name cannot be empty",
				icon: "error",
			});
			setLoading(false);
			return;
		} else if (form.email === "") {
			swal.fire({
				title: "Error!",
				text: "Email cannot be empty",
				icon: "error",
			});
			setLoading(false);
			return;
		} else if (form.phone === "") {
			swal.fire({
				title: "Error!",
				text: "phone cannot be empty",
				icon: "error",
			});
			setLoading(false);
			return;
		} else if (form.password !== form.confirmPassword) {
			swal.fire({
				title: "Error!",
				text: "password and confirm password not same",
				icon: "error",
			});
			setLoading(false);
			return;
		}
		const checkBox = document.getElementById("customCheck1");
		if (checkBox.checked === false) {
			swal.fire({
				title: "Error!",
				text: "You must aggree with terms & conditions",
				icon: "error",
			});
			setLoading(false);
			return;
		} else {
			const data = new FormData();
			data.append("name", form.name);
			data.append("email", form.email);
			data.append("phone", form.phone);
			data.append("password", form.password);
			data.append("photo", photo);

			// for (const key of data) {
			// 	console.log(key);
			// }
			OnRegister(data)
				.then((res) => {
					swal
						.fire({
							title: "Success!",
							text: res.data.message,
							icon: "success",
						})
						.then(() => {
							return navigate("/login");
						});
				})
				.catch((err) => {
					if (err.response?.data?.message === "failed in validation") {
						const error = err.response.data.error;
						error.map((e) => toastr(e, "error"));
					} else {
						swal.fire({
							title: "Error!",
							text: err.response?.data?.message,
							icon: "error",
						});
					}
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};
	return (
		<>
			<div className="d-flex" style={{ height: "100vh" }}>
				<Decoration />
				<div className="justify-content-center align-content-center col-6 mt-4">
					<div className="text-center">
						<h1 className="text-warning">Let’s Get Started !</h1>
						<span className="text-muted">
							Create new account to access all features
						</span>
					</div>
					<form
						onSubmit={(e) => onSubmit(e)}
						className="d-flex align-content-center justify-content-center"
					>
						<div className="mt-5 col-6 ">
							<div className="row d-flex justify-content-center align-content-center">
								<div className="col-md-12 mb-2">
									<div className="form-group text-muted">
										<label htmlFor="name">Name</label>
										<input
											type="text"
											className="form-control form-control mt-2"
											id="name"
											placeholder="Masukkan alamat email"
											onChange={(e) =>
												setForm({ ...form, name: e.target.value })
											}
										/>
									</div>
								</div>

								<div className="col-md-12 mb-2">
									<div className="form-group text-muted">
										<label htmlFor="email">Email</label>
										<input
											type="text"
											className="form-control form-control mt-2"
											id="email"
											placeholder="Masukkan alamat email"
											onChange={(e) =>
												setForm({ ...form, email: e.target.value })
											}
										/>
									</div>
								</div>
								<div className="col-md-12 mb-2">
									<div className="form-group text-muted">
										<label htmlFor="phone">Phone Number</label>
										<input
											type="text"
											className="form-control form-control mt-2"
											id="phone"
											placeholder="08xxxxxxxxxx"
											onChange={(e) =>
												setForm({ ...form, phone: e.target.value })
											}
										/>
									</div>
								</div>

								<div className="col-md-12 mb-2">
									<div className="form-group text-muted">
										<label htmlFor="createPassword">Create New Password</label>
										<input
											type="password"
											className="form-control form-control mt-2"
											id="createPassword"
											placeholder="Create New Password"
											onChange={(e) =>
												setForm({ ...form, password: e.target.value })
											}
										/>
									</div>
								</div>
								<div className="col-md-12 mb-2">
									<div className="form-group text-muted">
										<label htmlFor="newPassword">New Password</label>
										<input
											type="password"
											className="form-control form-control mt-2"
											id="newPassword"
											placeholder="New Password"
											onChange={(e) =>
												setForm({ ...form, confirmPassword: e.target.value })
											}
										/>
									</div>
								</div>
								<div className="col-md-12 mb-4">
									<div className="form-group text-muted">
										<label htmlFor="profilePicture">Profile Picture</label>
										<input
											type="file"
											className="form-control form-control mt-2"
											id="ProfilePicture"
											accept=".png, .jpg, .jpeg"
											onChange={(e) => {
												setPhoto(e.target.files[0]);
											}}
										/>
									</div>
								</div>
								<div className="custom-control custom-checkbox mb-3">
									<input
										type="checkbox"
										className="custom-control-input"
										id="customCheck1"
									/>
									<label
										className="ps-2 custom-control-label text-muted"
										htmlFor="customCheck1"
									>
										I agree to terms & conditions
									</label>
								</div>

								<div className="col-md-12 flex-column justify-content-center align-content-center mb-4">
									{loading ? (
										<button
											type="submit"
											className="btn btn-warning col-12 text-white"
											disabled
										>
											<span
												className="spinner-border spinner-border-sm"
												role="status"
												aria-hidden="true"
											/>
										</button>
									) : (
										<button
											type="submit"
											className="btn btn-warning col-12 text-white"
										>
											Register
										</button>
									)}
								</div>
							</div>
						</div>
					</form>
					<div className="text-center">
						<span>Already have Account? </span>
						<Link to="/login" className="text-decoration-none text-warning">
							Log in Here
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
