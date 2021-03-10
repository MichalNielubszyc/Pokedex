import React from "react";
import { Button } from "@material-ui/core";
import { Page } from "../../components/page";
import { Title } from "../../components/title";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";

import { PokemonProfile } from "../pokemons/PokemonProfile";

export const Favourites = () => {
  const [favouritePokemons, setFavouritePokemons] = useLocalStorage(
    "favourites",
    []
  );

  const removeFromFavourites = (item) => {
      const pokemonToBeRemovedIndex = favouritePokemons.findIndex((pokemon) => pokemon.id === item.id);
      favouritePokemons.splice(pokemonToBeRemovedIndex,(pokemonToBeRemovedIndex+1));
      console.log(favouritePokemons)
      // favourites = favouritePokemons
      // setFavouritePokemons(favouritePokemons)
      // localStorage.setItem(favouritePokemons, JSON.stringify(favouritePokemons));
  }

  return (
    
      <div className={`mt-12 p-8 bg-red-500 rounded shadow-xl`}>
        <Title style={{ textTransform: "capitalize", marginBottom: "10px" }}>
          your favourite pokemons:
        </Title>
        <div className="pokemonDetailsContainer">
          {favouritePokemons.map((pokemon) => (
            <div className="pokemonDetails">
              <Title
                style={{ textTransform: "capitalize", marginBottom: "10px" }}
              >
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
              {/* <Button
              style={{ marginTop: "20px", backgroundColor: "white" }}
              onClick={() => {removeFromFavourites(pokemon)}}
            >
              remove from favourites
            </Button> */}
            </div>
          ))}
        </div>
      </div>
    
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
