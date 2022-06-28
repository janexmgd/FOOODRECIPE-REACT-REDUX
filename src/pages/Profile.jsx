import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../assets/styles/profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyrecipe } from "../redux/actions/myRecipe";
import { getDetailUser } from "../redux/actions/users";
import { onDelete } from "../redux/actions/deleteRecipe";
const Profile = () => {
	const navigate = useNavigate();
	const myRecipe = useSelector((state) => {
		return state.myRecipe;
	});
	const detailUser = useSelector((state) => {
		return state.detailUser;
	});
	const dispatch = useDispatch();
	useEffect(() => {
		// fetch api my recipe
		dispatch(getMyrecipe());
		dispatch(getDetailUser());
		// console.log(myRecipe);
		console.log(detailUser);
	}, []); // eslint-disable-line
	const onDeleted = (id) => {
		const deleteConfirm = window.confirm("are you sure to delete this recipe?");
		if (deleteConfirm === true) {
			onDelete(id)
				.then((res) => {
					alert("sukses delete recipe");
					dispatch(getMyrecipe());
					navigate("/profile");
				})
				.catch((err) => {
					alert(err);
				});
		}
		console.log(id);
	};
	// for get user

	const [activeTabs, setActiveTabs] = useState("1");
	const logout = () => {
		localStorage.clear();
		alert("Logout berhasil");
		return navigate("/");
	};
	return (
		<>
			<Navbar />
			<div className={styles.container}>
				<section className={styles.containerIntro}>
					<div className={styles.containerIntroJumbotron}>
						<div className={styles.containerIntroJumbotronProfile}>
							<img
								src={`${process.env.REACT_APP_MY_BACKEND}/${detailUser.data.photo}`}
								alt=""
							/>
							<h1>{detailUser.data.name}</h1>

							<button
								onClick={() => {
									logout();
								}}
							>
								Logout
							</button>
						</div>
						<div className="col-lg-10 d-flex flex-column justify-content-center align-content-center ms-5">
							<Nav tabs>
								<NavItem>
									<NavLink
										className={activeTabs === "1" ? "active" : ""}
										onClick={() => setActiveTabs("1")}
									>
										My Recipe
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={activeTabs === "2" ? "active" : ""}
										onClick={() => setActiveTabs("2")}
									>
										Saved Recipe
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={activeTabs === "3" ? "active" : ""}
										onClick={() => setActiveTabs("3")}
									>
										Liked Recipe
									</NavLink>
								</NavItem>
							</Nav>
							<TabContent activeTab={activeTabs}>
								<TabPane tabId="1">
									<div className="row">
										{myRecipe.data ? (
											myRecipe.data.map((item, i) => (
												<div className="col-4  pt-5" key={i}>
													<div
														// to={`/recipe/${item.id}`}
														className="d-flex justify-content-center position-relative m-auto"
														style={{
															width: "300px",
															height: "300px",
														}}
													>
														<img
															src={`${process.env.REACT_APP_MY_BACKEND}/${item.photo}`}
															alt=""
															style={{
																width: "300px",
																height: "300px",
															}}
														/>
														<Link
															to={`/recipe/${item.id}`}
															className={styles.titleRecipe}
															style={{
																textDecoration: "none",
															}}
														>
															{item.title}
														</Link>
														<Link
															to={`/recipe/edit/${item.id}`}
															style={{
																color: "#EFC81A",
																fontSize: "30px",
																position: "absolute",
																marginLeft: "250px",
															}}
														>
															<div className="fa fa-edit"></div>
														</Link>
														<Link
															to="#"
															onClick={() => {
																onDeleted(item.id);
															}}
															style={{
																color: "#EFC81A",
																fontSize: "30px",
																position: "absolute",
																marginLeft: "150px",
															}}
														>
															<div className="fa fa-trash"></div>
														</Link>
													</div>
												</div>
											))
										) : (
											<div className="mh-100"></div>
										)}
									</div>
								</TabPane>
								<TabPane tabId="2" className="h-100"></TabPane>
								<TabPane tabId="3" className="h-100"></TabPane>
							</TabContent>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
};
export default Profile;
