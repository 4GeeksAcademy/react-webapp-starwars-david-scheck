const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters : [],
			planets: [],  // Add this line for planets
			favorites: [],
		},
		actions: {
			fetchCharacters: () => {
				fetch('https://www.swapi.tech/api/people?limit=100')
				.then((res) => res.json())
				.then((payload) => {
					setStore({ characters: payload.results})
				})
				.catch()
			},
			fetchPlanets: () => {  // Add this new action for fetching planets
				fetch('https://www.swapi.tech/api/planets?limit=100')
				.then((res) => res.json())
				.then((payload) => {
					setStore({ planets: payload.results})
				})
				.catch()
			},
			toggleFavorite: (id, type, name) => {
				const store = getStore();

				let filteredFavorite = false;

				const newFavorites = store.favorites.filter((favorite) => {
					if (favorite.id === id && favorite.type === type) {
						filteredFavorite = ture;  // Note: there's a typo here, it should be 'true'
						return false;
					}

					return true;
				});

				if(!filteredFavorite) {
					newFavorites.push({ id, type, name});
				}

				setStore({...store, favorites: newFavorites });
			}
		}
	};
};

export default getState;