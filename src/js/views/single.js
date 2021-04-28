import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

// Importing the stylesheet
import "../../styles/views/_single.scss";
// Importing the image
import swImage from "../../img/swImage.jpg";
// Importing the react-bootstrap components
import { Container, Row, Col, Image } from "react-bootstrap";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const properties = actions.getElementById(params.type, params.uid);
	return (
		<Container>
			<Row>
				<Col xs={6}>
					<Image src={swImage} rounded fluid />
				</Col>

				<Col xs={6}>
					<h2 className="text-center mt-3">{properties[0][1]}</h2>
					<p className="text-center h5">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
						voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim
						veniam.
					</p>
				</Col>
			</Row>
			<Row className="my-1">
				<Col xs={12}>
					<hr />
				</Col>
			</Row>
			<Row>
				{properties.map((element, index) => {
					return (
						<Col key={index}>
							<h5 className="text-center">{element[0]}</h5>
							<p className="text-center">{element[1]}</p>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
