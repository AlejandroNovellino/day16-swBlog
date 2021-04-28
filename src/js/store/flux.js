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
						// Push the new element
						if (response.ok) auxList.push(body.result);
					} catch (error) {
						console.log(`🚀 ~ file: flux.js ~ line 44 ~ fetchElements: ~ error`, error);
					}
				}

				// Object to store
				let auxObj = {};
				auxObj[toFind] = [...store[toFind], ...auxList];
				setStore(auxObj);
			},
			addToFavorites: element => {
				const store = getStore();

				setStore({
					favorites: [...store.favorites, element]
				});
			}
		}
	};
};

export default getState;
