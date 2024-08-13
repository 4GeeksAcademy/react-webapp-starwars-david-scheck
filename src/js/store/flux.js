const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters : []
			favorites: [],
		},
		actions: {
			fetchCharacters: () => {
				fetch('https://www.swapi.tech/api/people?limit=100')
				.then((res) => res.json())
				.then((payload) => {
					
					setStore({ characters: payload:})

				})
				.catch()
			},
			toggleFavorite: (id, type, name) => {
				const store = getStore();

				let filteredFavorite = false;

				const newFavorites = favorites.filter((favorite) => {
					if (favorite.id === id && favorite.type === type) {
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
			}
		}
	};
};

export default getState;
