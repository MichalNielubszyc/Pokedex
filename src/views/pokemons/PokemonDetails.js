import { useState, useEffect } from "react";
import { Title } from "../../components/title";
import { Page } from "../../components/page";
import { Button } from "@material-ui/core";

import { PokemonProfile } from "./PokemonProfile";

import { useLocalStorage } from "../../hooks/useLocalStorage";

export const PokemonDetails = (props) => {
  const pokemonId = props.match.params.pokeid;
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [state, setState] = useState("initial");

  const [favouritePokemons, setFavouritePokemons] = useLocalStorage(
    "favourites", []
    );
     
  let favouritePokemonsIds = favouritePokemons.map(pokemon => pokemon.id)

  const saveInFavourites = () => {
    if (favouritePokemonsIds.includes(pokemonDetails.id)){
      return
    }
      setFavouritePokemons([...favouritePokemons, pokemonDetails]);
      console.log(favouritePokemons);
  };

  const fetchPokemons = (api) => {
    setState("loading");
    fetch(api)
      .then((r) => r.json())
      .then((data) => {
        setPokemonDetails(data);
        setState("loaded");
      })
      .catch(() => setState("error"));
  };

  useEffect(() => {
    fetchPokemons(pokemonUrl);
  }, []);

  return (
    <Page>
      {state === "loading" && (
        <Title style={{ textTransform: "capitalize" }}>
          Loading your Pokemon
        </Title>
      )}
      {state === "error" && (
        <Title style={{ textTransform: "capitalize" }}>
          Error: No pokemons for you
        </Title>
      )}
      {state === "loaded" && (
        <>
          <Title style={{ textTransform: "capitalize" }}>
            {pokemonDetails.name}
          </Title>

          <div className="pokemonDetails">
            <PokemonProfile
              name={pokemonDetails.name}
              types={pokemonDetails.types}
              avatar={pokemonDetails.sprites.front_default}
              number={pokemonDetails.id}
              exp={pokemonDetails.base_experience}
              height={pokemonDetails.height}
              weight={pokemonDetails.weight}
              abilities={pokemonDetails.abilities}
            />
            <Button
              style={{ marginTop: "20px", backgroundColor: "white" }}
              onClick={saveInFavourites}
            >
              add to favourites
            </Button>
          </div>
        </>
      )}
    </Page>
  );
};
