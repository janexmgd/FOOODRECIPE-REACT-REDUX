/* eslint-disable spaced-comment */
/* eslint-disable no-useless-return */
import React, { useState } from "react";
import Decoration from "../components/Decoration";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { toastr } from "../../src/utils/toastr";
import { OnLogin } from "../redux/actions/auth";

const LoginTest = () => {
	// const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (form.email === "") {
			swal.fire({
				title: "Error!",
				text: "email cannot be empty",
				icon: "error",
			});
			setLoading(false);
			return;
		} else if (form.password === "") {
			swal.fire({
				title: "Error!",
				text: "password cannot be empty",
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
			OnLogin(form)
				.then((res) => {
					// console.log(res);
					swal
						.fire({
							title: "Success!",
							text: res.message,
							icon: "success",
						})
						.then(() => {
							window.location.href = `/`;
						});
				})
				.catch((err) => {
					console.log(err);
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
				<div className="d-flex flex-column justify-content-center align-content-center col-6">
					<div className="text-center">
						<h1 className="text-warning">Wellcome</h1>
						<span className="text-muted">Log in into your account</span>
					</div>
					<form
						onSubmit={(e) => onSubmit(e)}
						className="d-flex align-content-center justify-content-center"
					>
						<div className="mt-3 col-6 ">
							<div className="row d-flex justify-content-center align-content-center">
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
										<label htmlFor="newPassword">New Password</label>
										<input
											type="password"
											className="form-control form-control mt-2"
											id="newPassword"
											placeholder="New Password"
											onChange={(e) =>
												setForm({ ...form, password: e.target.value })
											}
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
											Login
										</button>
									)}
								</div>
							</div>
						</div>
					</form>
					<div className="text-center">
						<span className="text-muted">Dont have Account? </span>
						<Link to="/register" className="text-decoration-none text-warning">
							Sign Up Here
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginTest;
