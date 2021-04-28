const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			baseUrl: "https://www.swapi.tech/api/",
			characters: [],
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
					const response = await fetch(store.baseUrl + toFind);

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
					console.log(`🚀 ~ file: flux.js ~ line 37 ~ fetchPages: ~ error`, error);
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

						if (response.ok) auxList.push(body.result);
					} catch (error) {
						console.log(`🚀 ~ file: flux.js ~ line 44 ~ fetchElements: ~ error`, error);
					}
				}

				if (toFind == "people/") {
					setStore({
						characters: [...store.characters, ...auxList]
					});
				} else if (toFind == "planets/") {
					setStore({
						planets: [...store.planets, ...auxList]
					});
				} else if (toFind == "starships/") {
					setStore({
						starships: [...store.starships, ...auxList]
					});
				}
			},
			addToFavorites: element => {
				const store = getStore();

				setStore({
					favorites: [...store.favorites, element]
				});
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
