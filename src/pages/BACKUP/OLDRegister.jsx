/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import styles from "../assets/styles/register.module.css";
import { Link, useNavigate } from "react-router-dom";
import Decoration from "../components/Decoration";
import { OnRegister } from "../redux/actions/auth";

const Register = () => {
	const navigate = useNavigate();
	// to catch input
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	// to catch input file photo
	const [photo, setPhoto] = useState(null);
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(form);
		// to catch register checkbox
		const checkBox = document.getElementById("registerCheckbox");
		// console.log(photo);

		if (
			form.name === "" ||
			form.email === "" ||
			form.phone === "" ||
			form.password === ""
		) {
			alert("semua field input wajib diisi");
		}
		if (form.password !== form.confirmPassword) {
			alert("field create password dan new password harus sama");
		} else if (checkBox.checked === false) {
			alert("You must aggree with terms & conditions");
		} else {
			const data = new FormData();
			data.append("name", form.name);
			data.append("email", form.email);
			data.append("phone", form.phone);
			data.append("password", form.password);
			data.append("photo", photo);
			// for (var key of data) {
			//	console.log(key);
			// }

			OnRegister(data)
				.then((res) => {
					alert("register sukses");
					navigate("/login");
				})
				.catch(() => {
					alert("register gagal");
				});
		}
	};
	return (
		<>
			<div className={styles.container}>
				<Decoration />
				<div className={styles.main}>
					<div className={styles.mainContainer}>
						<div className={styles.regard}>
							<div className={styles.greeting}>Let's Get Started</div>
							<div className={styles.subGreeting}>
								Create new account to access all features
							</div>
						</div>
					</div>
					<div className={styles.formContainer}>
						<div className={styles.formInput}>
							<form action="" onSubmit={(e) => onSubmit(e)}>
								<div className={styles.textType}>
									<div className={styles.a}>Name</div>
									<div className={styles.b}>
										<input
											type="text "
											id="name "
											name="name "
											placeholder="Name"
											onChange={(e) =>
												setForm({ ...form, name: e.target.value })
											}
										/>
									</div>
									<div className={styles.c}>Email Address</div>
									<div className={styles.d}>
										<input
											type="text "
											id="email"
											name="email"
											placeholder="Enter Email Address"
											onChange={(e) =>
												setForm({ ...form, email: e.target.value })
											}
										/>
									</div>
									<div className={styles.e}>Phone Number</div>
									<div className={styles.f}>
										<input
											type="text "
											id="phone "
											name="phone"
											placeholder="08xxxxxxxxxx"
											onChange={(e) =>
												setForm({ ...form, phone: e.target.value })
											}
										/>
									</div>
									<div className={styles.g}>Create New Password</div>
									<div className={styles.h}>
										<input
											type="password "
											id="password "
											name="password "
											placeholder="Create New Password"
											onChange={(e) =>
												setForm({ ...form, password: e.target.value })
											}
										/>
									</div>
									<div className={styles.i}>New Password</div>
									<div className={styles.j}>
										<input
											type="password "
											id="newpassword "
											name="newpassword "
											placeholder="New Password "
											onChange={(e) =>
												setForm({ ...form, confirmPassword: e.target.value })
											}
										/>
									</div>
									<div className="">
										<input
											type="file"
											accept=".png, .jpg"
											onChange={(e) => {
												setPhoto(e.target.files[0]);
											}}
										/>
									</div>
								</div>
								<div className={styles.checkbox}>
									<div className={styles.checkboxInput}>
										<input
											type="checkbox"
											name="aggrement"
											id="registerCheckbox"
										/>
									</div>
									<div>I aggre to terms & conditions</div>
								</div>
								<div className={styles.submitButton}>
									<button type="submit">Register Account</button>
								</div>
							</form>
						</div>
					</div>
					<div className={styles.loginDialog}>
						<div className={styles.dialog1}>Already have Account?</div>
						<div className={styles.dialog2}>
							<Link className={styles.dialog2Link} to="/login">
								Log in Here
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
