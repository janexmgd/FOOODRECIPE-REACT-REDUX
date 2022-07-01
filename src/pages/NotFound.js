import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<>
			<div className="page-wrap d-flex flex-row align-items-center">
				<div className="container">
					<div
						className="row justify-content-center"
						style={{ height: "100vh" }}
					>
						<div className="col-md-12 text-center d-flex flex-column justify-content-center align-item-center">
							<span className="display-1 d-block text-black">404</span>
							<div className="mb-4 lead text-black">
								The page you are looking for was not found.
							</div>
							<Link className="text-decoration-none text-black" to={`/`}>
								Back Home
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NotFound;
