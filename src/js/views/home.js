import React, { useContext } from "react";
import { CardGroup, Col, Container, Row } from "react-bootstrap";
import "../../styles/home.scss";

// Components imports
import { MyCard } from "../component/MyCard";

// Importing the Context
import { Context } from "../store/appContext";

export const Home = () => {
	// Using the context
	const { store, actions } = useContext(Context);

	return (
		<Container fluid>
			{/* Characters row*/}
			<Container className="mt-3 mb-4">
				<Row className="px-3">
					<h2>CHARACTERS</h2>
				</Row>
			</Container>
			<Container className="horizontal-scrollable">
				<Row className="flex-nowrap overflow-auto">
					{store.characters.map(char => {
						return (
							<Col xs={4} key={"C" + char.uid}>
								<MyCard
									id={"C" + char.uid}
									name={char.properties.name}
									gender={char.properties.gender}
									hair_color={char.properties.hair_color}
									eye_color={char.properties.eye_color}
								/>
							</Col>
						);
					})}
				</Row>
			</Container>
			{/* Planets row*/}
			<Container className="mt-4 mb-4">
				<Row className="px-3">
					<h2>PLANETS</h2>
				</Row>
			</Container>
			<Container className="horizontal-scrollable">
				<Row className="flex-nowrap overflow-auto">
					{store.planets.map(planet => {
						return (
							<Col xs={4} key={"C" + planet.uid}>
								<MyCard
									id={"P" + planet.uid}
									name={planet.properties.name}
									population={planet.properties.population}
									terrain={planet.properties.terrain}
								/>
							</Col>
						);
					})}
				</Row>
			</Container>
			<Container className="mt-4 mb-4">
				<Row className="px-3">
					<h2>STARSHIPS</h2>
				</Row>
			</Container>
			<Container className="horizontal-scrollable">
				<Row className="flex-nowrap overflow-auto">
					{store.starships.map(ship => {
						return (
							<Col xs={4} key={"C" + ship.uid}>
								<MyCard id={"S" + ship.uid} name={ship.properties.name} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</Container>
	);
};
