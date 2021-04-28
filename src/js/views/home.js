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
			{["people", "planets", "starships"].map(e => {
				return (
					<Container fluid key={e}>
						<Container className="mt-4 mb-4">
							<Row className="px-3">
								<h2>{e == "people" ? "CHARACTERS" : e == "planets" ? "PLANETS" : "STARSHIPS"}</h2>
							</Row>
						</Container>
						<Container className="horizontal-scrollable">
							<Row className="flex-nowrap overflow-auto">
								{store[e].map(element => {
									return (
										<Col xs={4} key={"C" + element.uid}>
											<MyCard
												type={e}
												name={element.properties.name}
												gender={e == "people" ? element.properties.gender : null}
												hair_color={e == "people" ? element.properties.hair_color : null}
												eye_color={e == "people" ? element.properties.eye_color : null}
												population={e == "planets" ? element.properties.population : null}
												terrain={e == "planets" ? element.properties.terrain : null}
												starship_class={
													e == "starships" ? element.properties.starship_class : null
												}
												passengers={e == "starships" ? element.properties.passengers : null}
											/>
										</Col>
									);
								})}
							</Row>
						</Container>
					</Container>
				);
			})}
		</Container>
	);
};
