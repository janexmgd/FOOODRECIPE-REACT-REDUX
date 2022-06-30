import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getListRecipe } from "../redux/actions/getListRecipe";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Code } from "react-content-loader";

import styles from "../assets/styles/search.module.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const Search = () => {
	const dispatch = useDispatch();
	const [queryParams] = useSearchParams();
	const search = queryParams.get("search") ? queryParams.get("search") : "";
	const sort = queryParams.get("sort") ? queryParams.get("sort") : "";
	const pages = queryParams.get("page") ? queryParams.get("page") : 1;
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState(search);
	// eslint-disable-next-line
	const [sortQuery, setSortQuery] = useState(sort);
	const [page, setPage] = useState(pages);
	const listRecipe = useSelector((state) => {
		return state.listRecipe;
	});
	// const pages = [];

	// test pagination

	const totalPage = listRecipe?.data?.data?.pagination?.totalPage;

	const onSubmit = (e) => {
		e.preventDefault();
		navigate(`/recipe?search=${searchQuery}&sort=${sortQuery}&page=${pages}`);
		dispatch(getListRecipe(searchQuery, sortQuery, pages));
	};
	const goToPage = (event, index) => {
		event.preventDefault();
		console.log(index);
		setPage(index);
		console.log(page);
		// router.push(`/home?search=${search}&field=${field}&page=${index}`);
		// navigate(`/recipe?search=${searchQuery}&sort=${sortQuery}&page=${index}`);
		// dispatch(getListRecipe(searchQuery, sortQuery, pages));

		window.location.href = `/recipe?search=${searchQuery}&sort=${sortQuery}&page=${index}`;
	};
	useEffect(() => {
		dispatch(getListRecipe(searchQuery, sortQuery, pages));
		// console.log(listRecipe?.data?.data?.data);
		// for (let i = 1; i <= listRecipe?.data?.data?.pagination?.totalPage; i++) {
		//	pages.push(i);
		// }
		console.log(pages);
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
						<select
							className=""
							style={{
								height: "5vh",
								width: "auto",
							}}
							onChange={(e) => {
								setSortQuery(e.target.value);
							}}
							value={sortQuery}
						>
							<option value="">Sort</option>
							<option value="title">Sortir berdasarkan title</option>

							{/* <option value="location">Sortir berdasarkan Lokasi</option> */}
							<option value="date">sortir berdasar tanggal dibuat</option>
						</select>
						<button type="submit" className="fa fa-search"></button>
					</form>
					{/* input sort */}
					{/* <form className="d-flex" onSubmit={(e) => onSort(e)}>
						<input list="sort" />
						<datalist id="sort">
							<option value="title" />
							<option value="date" />
						</datalist>
						<button type="submit">sort</button>
					</form> */}
				</div>
				<div className="row h-100">
					{listRecipe?.isLoading ? (
						<Code className="pt-5" />
					) : listRecipe?.data?.data?.data?.length === 0 ? (
						<div className={styles.noRecipe}>No relevant results found</div>
					) : (
						listRecipe?.data?.data?.data?.map((item, i) => (
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
											borderRadius: "25px",
										}}
										onError={(e) => {
											e.target.src = `${process.env.REACT_APP_MY_BACKEND}/recipe-default.jpeg`;
										}}
									/>
									<div className={styles.titleRecipe}>{item.title}</div>
								</Link>
							</div>
						))
					)}
				</div>
			</div>
			<div className="container-fluid pt-5 justify-content-center">
				<Pagination
					aria-label="Page navigation example"
					className="d-flex justify-content-center mt-5"
				>
					{[...Array(totalPage)].map((e, i) => (
						<PaginationItem active={i + 1 === parseInt(pages)} key={i}>
							<PaginationLink
								style={{
									color: "black",
									backgroundColor: "yellow",
									padding: "15px",
									margin: "1px",
								}}
								onClick={(event) => {
									goToPage(event, i + 1);
								}}
							>
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					))}
				</Pagination>
			</div>
			<Footer />
		</>
	);
};

export default Search;
