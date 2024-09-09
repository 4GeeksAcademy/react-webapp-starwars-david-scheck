const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			peopleList: [],
			characterId: {},
			peopleCard: [],
			planetsList: [],
			planetId: {},
			planetsCard: [],
			vehiclesList: [],
			vehicleId: {},
			vehiclesCard: [],
			favorites: [],
		},
		actions: {
			getPeopleList: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/people/")
					let data = await response.json()
					setStore({ peopleList: data.results })
					return
				} catch (error) {
					console.log(error)
					return
				}
			},

			getPeopleCard: async () => {
				try {
					let response = await fetch("https://swapi.dev/api/people/")
					let data = await response.json()
					setStore({ peopleCard: data.results })
					console.log(data.results);
					return
				} catch (error) {
					console.log(error)
					return
				}
			},

			getPlanetsList: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/planets/")
					let data = await response.json()
					setStore({ planetsList: data.results })
					return
				} catch (error) {
					console.log(error)
					return
				}
			},

			getPlanetsCard: async () => {
				try {
					let response = await fetch("https://swapi.dev/api/planets/")
					let data = await response.json()
					setStore({ planetsCard: data.results })
					console.log(data.results);
					return
				} catch (error) {
					console.log(error)
					return
				}
			},

			getVehiclesList: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/vehicles/");
					let data = await response.json();
					setStore({ vehiclesList: data.results });
					return
				} catch (error) {
					console.log(error);
					return
				}
			},

			getVehiclesCard: async () => {
				try {
					let response = await fetch("https://swapi.dev/api/vehicles/")
					let data = await response.json()
					setStore({ vehiclesCard: data.results })
					console.log(data.results);
					return
				} catch (error) {
					console.log(error)
					return
				}
			},

			searchAll: (searchTerm) => {
				const store = getStore();
				const lowerCaseSearchTerm = searchTerm.toLowerCase();

				const characterResults = store.peopleCard && store.peopleCard.length > 0
					? store.peopleCard.filter(character =>
						character.name.toLowerCase().includes(lowerCaseSearchTerm)
					).map(character => ({ ...character, type: 'character', id: store.peopleList.find(p => p.name === character.name)?.uid }))
					: [];

				const planetResults = store.planetsCard && store.planetsCard.length > 0
					? store.planetsCard.filter(planet =>
						planet.name.toLowerCase().includes(lowerCaseSearchTerm)
					).map(planet => ({ ...planet, type: 'planet', id: store.planetsList.find(p => p.name === planet.name)?.uid }))
					: [];

				const vehicleResults = store.vehiclesCard && store.vehiclesCard.length > 0
					? store.vehiclesCard.filter(vehicle =>
						vehicle.name.toLowerCase().includes(lowerCaseSearchTerm)
					).map(vehicle => ({ ...vehicle, type: 'vehicle', id: store.vehiclesList.find(v => v.name === vehicle.name)?.uid }))
					: [];

				return [...characterResults, ...planetResults, ...vehicleResults];
			},

			loadInitialData: () => {
				const actions = getActions();
				actions.getPeopleList();
				actions.getPeopleCard();
				actions.getPlanetsList();
				actions.getPlanetsCard();
				actions.getVehiclesList();
				actions.getVehiclesCard();
			},

			addFavorites: (name) => {
				const store = getStore();
				const isFavorite = store.favorites.includes(name);

				if (isFavorite) {
					// If the item is already in favorites, remove it
					setStore({
						favorites: store.favorites.filter(item => item !== name)
					});
				} else {
					// If the item is not in favorites, add it
					setStore({
						favorites: [...store.favorites, name]
					});
				}
			},

			deleteFavorite: (name) => {
				const store = getStore();
				let newFavorites = store.favorites.filter(item => item !== name);
				setStore({ favorites: newFavorites });
			},
		}
	};
};

export default getState;
