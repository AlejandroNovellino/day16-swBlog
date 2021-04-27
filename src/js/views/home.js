import React, { useContext } from "react";
import { CardGroup, Container, Row } from "react-bootstrap";
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
			<Row>
				<h2>CHARACTERS</h2>
			</Row>
			<Row className="">
				{store.characters.map(char => {
					return (
						<MyCard
							key={"C" + char.uid}
							id={"C" + char.uid}
							name={char.properties.name}
							gender={char.properties.gender}
							hair_color={char.properties.hair_color}
							eye_color={char.properties.eye_color}
						/>
					);
				})}
			</Row>
			{/* Planets row*/}
			<Row>
				<h2>PLANETS</h2>
			</Row>
			<Row>
				{store.planets.map(planet => {
					return (
						<MyCard
							key={"P" + planet.uid}
							id={"P" + planet.uid}
							name={planet.properties.name}
							population={planet.properties.population}
							terrain={planet.properties.terrain}
						/>
					);
				})}
			</Row>
		</Container>
	);
};
