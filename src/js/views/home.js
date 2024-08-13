import React, {useContext, useEffect} from "react";
import "../../styles/home.css";
import { CiHeart } from "react-icons/ci";

export const Home = () => {
	const {store, actions} = useContext(Context)
	useEffect(() => {

		actions.fetchCharacters();
	}, []);

	return (
	<div>
	<p>home page</p>



	<div style={(display: 'flex', gap: '1rem')}>
		{store.characters.map((character) => (
		
		<div key={character.uid}>
			<a></a>
				<Link to={"/character-details/${character.uid}`}>{character.name}</Link>
				<CiHeart onclick={() => actions.toggleFavorite(
					character.uid,
					"CHARACTER",
					character.name
				)} />
		</div>)}
	</div>
	</div>
);
