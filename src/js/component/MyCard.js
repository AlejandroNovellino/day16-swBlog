import React, { useContext } from "react";
import PropTypes from "prop-types";

// Importing the image
import swLogo from "../../img/swImage.jpg";
// Importing the react-bootstrap components
import { Container, Row, Button, Card, Col } from "react-bootstrap";
// Importing the Context
import { Context } from "../store/appContext";
//Importing Link from React Router
import { Link } from "react-router-dom";

export const MyCard = ({
	id,
	type,
	name,
	gender,
	hair_color,
	eye_color,
	population,
	terrain,
	starship_class,
	passengers
}) => {
	// Using the context
	const { store, actions } = useContext(Context);

	return (
		<Card style={{ width: "20rem" }}>
			<Card.Img variant="top" src={swLogo} />
			<Card.Body>
				<Container fluid>
					<Row>
						<Card.Title>{name}</Card.Title>
					</Row>
					<Row>
						{type == "people"
							? `Gender : ${gender}`
							: type == "planets"
								? `Population: ${population}`
								: `Starship Class: ${starship_class}`}
					</Row>
					<Row>
						{type == "people"
							? `Hair Color: ${hair_color}`
							: type == "planets"
								? `Terrain: ${terrain}`
								: `Passengers: ${passengers}`}
					</Row>
					{type == "people" && <Row>{"Eye Color: " + eye_color}</Row>}
					<Row className="justify-content-between mt-3">
						<Col xs={6} className="p-0">
							<Link to={`/${type}/${id}`}>
								<Button variant="outline-primary">Learn More</Button>
							</Link>
						</Col>
						<Col xs={2} className="p-0">
							<Button
								variant="outline-warning"
								onClick={e => {
									actions.addToFavorites(type, id, name);
								}}>
								{actions.favoritesContains(type, id) ? (
									<i className="fas fa-heart" />
								) : (
									<i className="far fa-heart" />
								)}
							</Button>
						</Col>
					</Row>
				</Container>
			</Card.Body>
		</Card>
	);
};

MyCard.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	gender: PropTypes.string,
	hair_color: PropTypes.string,
	eye_color: PropTypes.string,
	population: PropTypes.string,
	terrain: PropTypes.string,
	starship_class: PropTypes.string,
	passengers: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
