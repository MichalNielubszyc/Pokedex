import { useState, useEffect } from "react";
import { Title } from "../../components/title";
import { Page } from "../../components/page";
import { Button } from "@material-ui/core";

export const PokemonDetails = (props) => {
  const pokemonId = props.match.params.pokeid;
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [state, setState] = useState("initial");

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

  console.log(pokemonDetails);

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
              // onClick={handleNextButton}
            >
              add to favourites
            </Button>
          </div>
        </>
      )}
    </Page>
  );
};

const PokemonProfile = ({ number, name, types, avatar, exp, height, weight, abilities }) => {
  return (
    <figure
      className="max-w-xs bg-gray-100 rounded-xl p-4"
      style={{ padding: "0 0 10px" }}
    >
      <img
        className="w-32 h-32 rounded-full mx-auto"
        style={{ width: "200px", height: "auto" }}
        src={avatar}
        alt=""
        width="384"
        height="512"
      />
      <div className="pt-4 text-center" style={{ padding: "0 10px 0" }}>
        <figcaption className="font-medium">
          <div className="text-cyan-600">
            #{number} {name}
          </div>
          <div className="text-gray-500">
            Types: {types.map(({ type }) => type.name).join(", ")}
          </div>
          <div className="text-gray-500">
            Abilities: {abilities.map(({ ability }) => ability.name).join(", ")}
          </div>
          <div className="text-gray-500">
            Experience: {exp}
          </div>
          <div className="text-gray-500">
            Height: {height}
          </div>
          <div className="text-gray-500">
            Weight: {weight}
          </div>
        </figcaption>
      </div>
    </figure>
  );
};
