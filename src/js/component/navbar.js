import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Importing the stylesheet
import "../../styles/views/_navBar.scss";
// Importing the image
import swLogo from "../../img/swLogo.png";
// Importing the react-bootstrap components
import { Container, Row, Button, Col, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
// Importing the Context
import { Context } from "../store/appContext";

export const Navbar = () => {
	// Using the context
	const { store, actions } = useContext(Context);

	const handleDelete = e => {
		// Delete the element from  the favorites list
		actions.deleteFromFavorites(e.target.id);
	};

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Container>
				<Link to="/">
					<span className="navbar-brand" href="#">
						<img src={swLogo} width="100" height="50" alt="" />
					</span>
				</Link>
				<div className="ml-auto">
					<DropdownButton menuAlign="right" title={`Favorites ${store.favorites.length}`}>
						{store.favorites.map((element, index) => {
							return (
								<div className="dropdown-item" key={index}>
									<Container fluid>
										<Row>
											<Col xs={12}>
												<ButtonGroup>
													<Link to={`/${element[0]}/${element[1]}`}>
														<Button className="d-block" variant="primary">
															{element[2]}
														</Button>
													</Link>
													<Button
														className="d-block"
														variant="danger"
														id={`${element[0]}-${element[1]}`}
														onClick={handleDelete}>
														<i
															className="fas fa-trash"
															id={`${element[0]}-${element[1]}`}
														/>
													</Button>
												</ButtonGroup>
											</Col>
										</Row>
									</Container>
								</div>
							);
						})}
					</DropdownButton>
				</div>
			</Container>
		</nav>
	);
};
