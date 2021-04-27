import React from "react";
import { Link } from "react-router-dom";

import swLogo from "../../img/swLogo.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand" href="#">
					<img src={swLogo} width="100" height="50" alt="" />
				</span>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
		</nav>
	);
};
