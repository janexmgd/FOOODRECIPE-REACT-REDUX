import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";

// import pages
import Index from "../pages/Index";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import DetailRecipe from "../pages/DetailRecipe";
import AddRecipe from "../pages/AddRecipe";

const PrivateRoute = () => {
	const token = localStorage.getItem("token");

	if (token) {
		return <Outlet />;
	} else {
		return <Navigate to="/login" />;
	}
};
const router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Index />} />
				</Route>
				<Route path="/login">
					<Route index element={<Login />} />
				</Route>
				<Route path="/register">
					<Route index element={<Register />} />
				</Route>

				<Route path="/recipe" element={<PrivateRoute />}>
					<Route index element={<Search />} />
				</Route>
				<Route path="/profile" element={<PrivateRoute />}>
					<Route index element={<Profile />} />
				</Route>
				<Route path="/recipe/:id" element={<PrivateRoute />}>
					<Route index element={<DetailRecipe />} />
				</Route>
				<Route path="/addrecipe" element={<PrivateRoute />}>
					<Route index element={<AddRecipe />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default router;
