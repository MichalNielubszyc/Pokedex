import React from "react";
import { Page } from "../../components/page";
import { Title } from "../../components/title";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { PokemonProfile } from "../pokemons/PokemonProfile";

export const Favourites = () => {
  const [favouritePokemons, setFavouritePokemons] = useLocalStorage(
    "favourites",
    []
  );

  console.log(favouritePokemons);

  return (
    <Page>
      <Title style={{ textTransform: "capitalize", marginBottom: '10px' }}>
              your favourite pokemons:
            </Title>
      <div className="pokemonDetails">
        {favouritePokemons.map((pokemon) => (
          <>
            <Title style={{ textTransform: "capitalize", marginBottom: '10px' }}>
              {pokemon.name}
            </Title>
            <PokemonProfile
              style={{ marginBottom: "10px" }}
              name={pokemon.name}
              types={pokemon.types}
              avatar={pokemon.sprites.front_default}
              number={pokemon.id}
              exp={pokemon.base_experience}
              height={pokemon.height}
              weight={pokemon.weight}
              abilities={pokemon.abilities}
            />
          </>
        ))}
      </div>
    </Page>
    // {/* <Title>Favourites</Title>

    // <p className="text-white py-6 text-center">
    //   Here will be list of saved pokemons from localStorage
    // </p>

    //  <ol className="text-white list-decimal">
    //   <p className="font-bold">What you need to do</p>
    //   <li>
    //     Import hook `useLocalStorage` and use it to consume data from localStorage, it's fairly straightforward. Think of it as `useState`, in case of any problems don't hesitate to ask me for help
    //   </li>
    //   <li>
    //     Use loaded data to display list of pokemons added to localStorage. If there is no pokemon in localStorage display message "There is no pokemons in your favourties list "
    //   </li>
    //   </ol> */}
  );
};
