import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Code } from "react-content-loader";

// import styles
import styles from "../assets/styles/index.module.css";

// import components
import Footer from "../components/Footer";

// import actions
import { getLatestRecipe } from "../redux/actions/latestRecipe";
import { getDetailUser } from "../redux/actions/users";

// import utils page
import photo1 from "../assets/images/ezgif-2-3982b7e365.webp";
import photo2 from "../assets/images/ezgif-2-31054d5404.webp";
import photo3 from "../assets/images/ezgif-2-1d9c3d90a5.webp";

const Index = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // eslint-disable-next-lin
	const [querySearch, setQuerySearch] = useState("");
	const latestRecipe = useSelector((state) => {
		return state.latestRecipe;
	});
	const detailUser = useSelector((state) => {
		return state.detailUser;
	});
	const token = localStorage.getItem("token");
	const onSubmit = () => {
		navigate("/recipe?search=" + querySearch);
	};
	useEffect(() => {
		dispatch(getLatestRecipe());
		if (token) {
			dispatch(getDetailUser());
		}
	}, []);
	return (
		<>
			<div className={styles.body}>
				<nav className={styles.navbar}>
					<div className={styles.primaryMenu}>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/addrecipe">Add Recipe</Link>
							</li>
							<li>
								<Link to="/profile">Profile</Link>
							</li>
						</ul>
					</div>
					<div className={styles.secondaryMenu}>
						{token ? (
							<ul>
								<li>
									<Link to="/profile" className={styles.secondaryMenuLink}>
										<div className={styles.icon}>
											<i className="fa fa-user"></i>
										</div>
										<div>{detailUser?.data?.name}</div>
									</Link>
								</li>
							</ul>
						) : (
							<ul>
								<li>
									<Link to="/login" className={styles.secondaryMenuLink}>
										<div className={styles.icon}>
											<i className="fa fa-user"></i>
										</div>
										Login
									</Link>
								</li>
							</ul>
						)}
					</div>
				</nav>
				<div className={styles.container}>
					<section className={styles.intro}>
						<div className={styles.content}>
							<div className={styles.jumbotron}>
								<h1>Discover Recipe & Delicious Food</h1>
								<div>
									<form
										className={styles.formGroup}
										onSubmit={() => onSubmit()}
									>
										<div className={styles.iconSearch}>
											<i className="fa fa-search"></i>
										</div>
										<input
											type="text"
											placeholder="search restaurant, food"
											onChange={(e) => setQuerySearch(e.target.value)}
										/>
										<input
											type="submit"
											style={{
												display: "none",
											}}
										/>
									</form>
								</div>
							</div>
						</div>
						<div className={styles.decoration}>
							<img src={photo1} alt="" />
						</div>
					</section>
				</div>
				<div className={styles.container2}>
					<section className={styles.intro2}>
						<div className={styles.leftContent}>
							<div className={styles.jumbotron2}>
								<div className={styles.greeting2}>
									<h1>Popular for you</h1>
								</div>
								<img src={photo2} alt="" />
								<div className={styles.outline}></div>
							</div>
						</div>
						<div className={styles.rightContent}>
							<div className={styles.jumbotron3}>
								<h1>Healthy Bone Broth Ramen (Quick & Easy)</h1>
								<div className={styles.line}></div>
								<h2>
									Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen
									in a hurry? That’s right!
								</h2>
								<Link className={styles.jumbotron3Link} to="#">
									<button>Learn More</button>
								</Link>
							</div>
						</div>
					</section>
				</div>
				<div className={styles.container3}>
					<section className={styles.container3Intro}>
						<div className={styles.container3IntroLeftContent}>
							<div className={styles.container3IntroLeftContentJumbotron}>
								<div
									className={styles.container3IntroLeftContentJumbotronGreeting}
								>
									<h1>New Recipe</h1>
								</div>
								<img src={photo3} alt="" />
								<div
									className={styles.container3IntroLeftContentJumbotronOutline}
								></div>
							</div>
						</div>
						<div className={styles.container3IntroRightContent}>
							<div className={styles.container3IntroRightContentJumbotron}>
								<h1>Healthy Bone Broth Ramen (Quick & Easy)</h1>
								<div
									className={styles.container3IntroRightContentJumbotronLine}
								></div>
								<h2>
									Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen
									in a hurry? That’s right!
								</h2>
								<Link
									className={styles.container3IntroRightContentJumbotronLink}
									to="#"
								>
									<button>Learn More</button>
								</Link>
							</div>
						</div>
					</section>
				</div>
				<div className={styles.container4}>
					<section className={styles.container4Intro}>
						<div className={styles.container4IntroTopContent}>
							<div className={styles.container4IntroTopContentJumbotron}>
								<div
									className={styles.container4IntroTopContentJumbotronGreeting}
								>
									<h1>Latest Recipe</h1>
								</div>
							</div>
						</div>
						<div className={styles.container4IntroBottomContent}>
							<div className={styles.container4IntroBottomContentJumbotron}>
								<div className="row">
									{latestRecipe.isLoading ? (
										<Code />
									) : latestRecipe.data.length > 0 ? (
										latestRecipe.data.map((item, i) => (
											<div className="col-4  pt-5" key={i}>
												<Link
													to={`/recipe/${item.id}`}
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
														onError={(e) => {
															e.target.src = `${process.env.REACT_APP_MY_BACKEND}/recipe-default.jpeg`;
														}}
													/>
													<div className={styles.titleRecipe}>{item.title}</div>
												</Link>
											</div>
										))
									) : null}
								</div>
							</div>
						</div>
					</section>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Index;
