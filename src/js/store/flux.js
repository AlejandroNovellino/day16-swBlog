const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			baseUrl: "https://www.swapi.tech/api/",
			people: [],
			planets: [],
			starships: [],
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a function
			fetchPages: async toFind => {
				// Fetch the pages of information

				// Get the store and the actions
				const store = getStore();
				const actions = getActions();

				try {
					const response = await fetch(store.baseUrl + toFind + "/");

					if (response.ok) {
						let body = await response.json();
						let totalPages = body.total_pages;
						let pagesCounter = 1;
						while (pagesCounter <= totalPages) {
							await actions.fetchElements(toFind, body.results);

							// Updating the counter variable
							pagesCounter++;

							// Fetching the new page
							if (body.next != null) {
								const auxResponse = await fetch(body.next);
								body = await auxResponse.json();
							}
						}
					}
				} catch (error) {
					console.log(`🚀 ~ file: flux.js ~ line 40 ~ fetchPages: ~ error`, error);
				}
			},
			fetchElements: async (toFind, elements) => {
				// Fetch each element of the pages

				// Get the store
				const store = getStore();

				// Aux to store the values fetched
				const auxList = [];

				for (const element of elements) {
					try {
						const response = await fetch(element.url);
						const body = await response.json();
						// Push the new element
						if (response.ok) auxList.push(body.result);
					} catch (error) {
						console.log(`🚀 ~ file: flux.js ~ line 59 ~ fetchElements: ~ error`, error);
					}
				}

				// Object to store
				let auxObj = {};
				auxObj[toFind] = [...store[toFind], ...auxList];
				setStore(auxObj);
			},
			getArrayOfPropForType: type => {
				// Return the array of properties fot the type

				// Properties wanted for the type "people"
				const arrPropForPeople = [
					["name", "Name"],
					["birth_year", "Birth Year"],
					["gender", "Gender"],
					["height", "Height"],
					["skin_color", "Skin Color"],
					["eye_color", "Eye Color"]
				];
				// Properties wanted for the type "planets"
				const arrPropForPlanets = [
					["name", "Name"],
					["climate", "Climate"],
					["population", "Population"],
					["orbital_period", "Orbital Period"],
					["rotation_period", "Rotation Period"],
					["diameter", "Diameter"]
				];
				// Properties wanted for the type "starships"
				const arrPropForStarships = [
					["name", "Name"],
					["model", "Model"],
					["starship_class", "Starship Class"],
					["crew", "Crew"],
					["passengers", "Passengers"],
					["length", "Length"]
				];
				// Return the asked array
				if (type == "people") {
					return arrPropForPeople;
				} else if (type == "planets") {
					return arrPropForPlanets;
				} else if (type == "starships") {
					return arrPropForStarships;
				}
			},
			getElementById: (type, uid) => {
				// It returns the element with the given uid and only 6 properties to display

				// Get the arrays of the types
				const arrayToSearch = getStore()[type];
				// Find the element of the wanted type by its "uid"
				const found = arrayToSearch.filter(element => {
					return element.uid == uid;
				})[0];
				// Get the props for each type of element
				const arrOfProps = getActions().getArrayOfPropForType(type);
				// Get the properties of the requested element
				const arrToReturn = arrOfProps.map(element => {
					return [element[1], found.properties[element[0]]];
				});

				return arrToReturn;
			},
			favoritesContains: (type, id) => {
				// Return true if the element exist

				const includes = element => {
					return element[0] == type && element[1] == id;
				};

				return getStore().favorites.some(includes);
			},
			addToFavorites: (type, id, name) => {
				// Add the element to the favorites list

				const store = getStore();
				const newFavorite = [type, id, name];
				// If the element already exist on the list, skip
				if (getActions().favoritesContains(type, id)) return null;

				setStore({
					favorites: [...store.favorites, newFavorite]
				});
			},
			deleteFromFavorites: id => {
				// Delete the element from the favorites list

				const store = getStore();
				const auxFavorites = store.favorites.filter(element => {
					let aux = `${element[0]}-${element[1]}`;
					return id != aux;
				});

				setStore({
					favorites: auxFavorites
				});
			}
		}
	};
};

export default getState;
