import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getListRecipe } from "../redux/actions/getListRecipe";

import styles from "../assets/styles/search.module.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const Search = () => {
	const dispatch = useDispatch();
	const [queryParams] = useSearchParams();
	const search = queryParams.get("search") ? queryParams.get("search") : "";
	const sort = queryParams.get("sort") ? queryParams.get("sort") : "";
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState(search);
	// eslint-disable-next-line
	const [sortQuery, setSortQuery] = useState(sort);
	const listRecipe = useSelector((state) => {
		return state.listRecipe;
	});
	const onSubmit = (e) => {
		e.preventDefault();
		navigate("/recipe?search=" + searchQuery);
		dispatch(getListRecipe(searchQuery));
	};
	const onSort = (e) => {
		e.preventDefault();
		const Querysort = document.getElementById("sort").options[0].value;
		console.log(Querysort);
		setSortQuery(Querysort);
		navigate(`/recipe?search=${searchQuery}&sort=${Querysort}`);
		dispatch(getListRecipe(searchQuery));
	};
	useEffect(() => {
		dispatch(getListRecipe(searchQuery));
	}, []);
	return (
		<>
			<Navbar />
			<div className="container-fluid pt-5" style={{ minHeight: "80vh" }}>
				<div className="mt-5 d-flex">
					<form onSubmit={(e) => onSubmit(e)} className={styles.form}>
						<input
							type="text"
							name=""
							id=""
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search Recipe at here"
							value={searchQuery}
						/>
						<button type="submit" className="fa fa-search"></button>
					</form>
					{/* input sort */}
					<form className="d-flex" onSubmit={(e) => onSort(e)}>
						<input list="sort" />
						<datalist id="sort">
							<option value="title" />
							<option value="date" />
						</datalist>
						<button type="submit">sort</button>
					</form>
				</div>
				<div className="row h-100">
					{listRecipe.isLoading ? (
						<div>Loading</div>
					) : listRecipe.data === null ? (
						<div className={styles.noRecipe}>No relevant results found</div>
					) : (
						listRecipe.data.map((item, i) => (
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
									/>
									<div className={styles.titleRecipe}>{item.title}</div>
								</Link>
							</div>
						))
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Search;
