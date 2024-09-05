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

			getPeopleList: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/people/")
					let data = await response.json()
					setStore({ peopleList: data.results })
					// console.log(data);
					return
				} catch (error) {
					console.log(error)
					return
				}
			},
		
			getCharacterId: async (id) => {
				try {
					let response = await fetch(`https://www.swapi.tech/api/people/${id}`)
					let data = await response.json()
					setStore({ characterId: data.result })
					// console.log(data);
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
		
			getPlanetsList: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/planets/")
					let data = await response.json()
					setStore({ planetsList: data.results })
					// console.log(data);
					return
				} catch (error) {
					console.log(error)
					return
				}
			},

			getPlanetId: async (id) => {
				try {
					let response = await fetch(`https://www.swapi.tech/api/planets/${id}`)
					let data = await response.json()
					setStore({ planetId: data.result })
					// console.log(data);
					return
				} catch (error) {
					console.log(error)
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
	
			getVehiclesList: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/vehicles/");
					let data = await response.json();
					setStore({ vehiclesList: data.results });
					// console.log(data);
					return
				} catch (error) {
					console.log(error);
					return
				}
			},
	
			getVehicleId: async (id) => {
				try {
					let response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
					let data = await response.json();
					setStore({ vehicleId: data.result });
					// console.log(data);
					return
				} catch (error) {
					console.log(error);
					return
				}
			},

			addFavorites: (fav) => {
				const store = getStore();
				if (store.favorites.includes(fav)) {
					// If the item is already in favorites, remove it
					setStore({ 
						favorites: store.favorites.filter(item => item !== fav) 
					});
				} else {
					// If the item is not in favorites, add it
					setStore({ 
						favorites: [...store.favorites, fav] 
					});
				}
			},

			deleteFavorite: (fav) => {
				const store = getStore();
				let newFavorites = store.favorites.filter((item) => item !== fav)
				setStore({ favorites: newFavorites })
			},
		}
	};
};

export default getState;
