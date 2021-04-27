import React, { useContext } from "react";
import { CardGroup, Container, Row } from "react-bootstrap";
import "../../styles/home.scss";

// Components imports
import { MyCardChar } from "../component/MyCardChar";

// Importing the Context
import { Context } from "../store/appContext";

export const Home = () => {
	// Using the context
	const { store, actions } = useContext(Context);

	return (
		<Container fluid>
			{/* Characters row*/}
			<Row className="">
				{store.characters.map(char => {
					return (
						<MyCardChar
							key={char.uid}
							name={char.properties.name}
							gender={char.properties.gender}
							hair_color={char.properties.hair_color}
							eye_color={char.properties.eye_color}
						/>
					);
				})}
			</Row>
			{/* Planets row*/}
			<Row />
		</Container>
	);
};
