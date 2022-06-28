import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Decoration from "../components/Decoration";
import styles from "../assets/styles/login.module.css";
import { OnLogin } from "../redux/actions/auth";
const Login = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const onSubmit = (e) => {
		e.preventDefault();

		const checkBox = document.getElementById("myCheckBox");
		if (checkBox.checked === true) {
			console.log("hallo");
			OnLogin(form)
				.then((res) => {
					return navigate("/");
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return alert("You must aggree with terms & conditions");
		}
	};
	return (
		<>
			<div className={styles.container}>
				<Decoration />
				<div className={styles.loginContainer}>
					<div className={styles.loginGreeting}>Welcome</div>
					<div className={styles.loginSub}>Log in into your account</div>
					<div className={styles.loginInput}>
						<form onSubmit={(e) => onSubmit(e)}>
							<div className={styles.textType}>
								<div className={styles.a}>E-mail</div>
								<div className={styles.b}>
									<input
										type="text"
										id="email "
										name="email"
										placeholder="examplexxx@gmail.com"
										onChange={(e) =>
											setForm({ ...form, email: e.target.value })
										}
									/>
									<br />
								</div>
								<div className={styles.c}>Password</div>
								<div>
									<input
										type="password"
										id="newpassword "
										name="newpassword "
										placeholder="Password"
										onChange={(e) =>
											setForm({ ...form, password: e.target.value })
										}
									/>
									<br />
								</div>
							</div>
							<div className={styles.checkboxContainer}>
								<div className={styles.checkboxInput}>
									<input type="checkbox" name="aggrement" id="myCheckBox" />
								</div>
								<div className={styles.checkboxDialog}>
									I aggre to terms & conditions
								</div>
							</div>
							<div className={styles.submitButton}>
								<button type="submit ">Log In</button>
							</div>
						</form>
						<div className={styles.forgotPassword}>
							<div>
								<Link className={styles.forgotPasswordLink} to="#">
									Forgot Password ?
								</Link>
							</div>
						</div>
						<div className={styles.signup}>
							<div className="signup1">Don’t have an account?</div>
							<div className="signup2">
								<Link className={styles.signup2Link} to="/register">
									Sign Up
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
