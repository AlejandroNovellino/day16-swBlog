import React, { useContext } from "react";
import PropTypes from "prop-types";

// Importing the image
import swLogo from "../../img/swImage.jpg";

// Importing the react-bootstrap components
import { Container, Row, Button, Card, Col } from "react-bootstrap";

// Importing the Context
import { Context } from "../store/appContext";

export const MyCard = ({ id, name, gender, hair_color, eye_color, population, terrain }) => {
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
					<Row>{id[0] == "C" ? `Gender : ${gender}` : `Population: ${population}`}</Row>
					<Row>{id[0] == "C" ? `Hair Color: ${hair_color}` : `Terrain: ${terrain}`}</Row>
					{id[0] == "C" && <Row>{"Eye Color: " + eye_color}</Row>}
					<Row className="justify-content-between mt-3">
						<Col xs={6} className="p-0">
							<Button variant="outline-primary">Learn More</Button>
						</Col>
						<Col xs={2} className="p-0">
							<Button variant="outline-warning">
								<i className="far fa-heart" />
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
	name: PropTypes.string,
	gender: PropTypes.string,
	hair_color: PropTypes.string,
	eye_color: PropTypes.string,
	population: PropTypes.string,
	terrain: PropTypes.string
};
