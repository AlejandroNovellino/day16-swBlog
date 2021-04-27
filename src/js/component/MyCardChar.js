import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

export const MyCardChar = ({ name, gender, hair_color, eye_color }) => {
	return (
		<Card style={{ width: "20rem" }}>
			<Card.Img variant="top" src="holder.js/100px180" />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{`${gender}\n${hair_color}\n${eye_color}`}</Card.Text>
				<Button variant="primary">Learn More</Button>
			</Card.Body>
		</Card>
	);
};

MyCardChar.propTypes = {
	name: PropTypes.string,
	gender: PropTypes.string,
	hair_color: PropTypes.string,
	eye_color: PropTypes.string
};
