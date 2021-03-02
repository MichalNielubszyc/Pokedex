import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Page } from "../../components/page";
import { Title } from "../../components/title";

import { Button } from "@material-ui/core";

const pokeApi = "https://pokeapi.co/api/v2/pokemon/";

export function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  // states: initial, loading, loaded, error
  const [state, setState] = useState("initial");

  const fetchPokemons = (api) => {
    setState("loading");
    fetch(api)
      .then((r) => r.json())
      .then((data) => {
        const pokemonData = data.results;
        setPokemons(pokemonData);
        setPreviousPage(data.previous);
        setNextPage(data.next);
        setState("loaded");
      })
      .catch(() => setState("error"));
  };

  useEffect(() => {
    fetchPokemons(pokeApi);
  }, []);

  const handleNextButton = () => {
    if (!nextPage) return;
    fetchPokemons(nextPage);
  };
  const handlePreviousButton = () => {
    if (!previousPage) return;
    fetchPokemons(previousPage);
  };

  return (
    <Page>
      <Title style={{ marginBottom: "20px" }}>Pokemons list</Title>
      {state === "loading" && (
        <p className="poke-font text-white grid grid-cols-2 grid-flow-row-dense gap-1">
          Loading your Pokemons
        </p>
      )}
      {state === "error" && (
        <p className="poke-font text-white grid grid-cols-2 grid-flow-row-dense gap-1">
          Error: No pokemons for you
        </p>
      )}
      {state === "loaded" && (
        <>
          <ol className="poke-font text-white grid grid-cols-2 grid-flow-row-dense gap-1">
            {pokemons.map((pokemon, index) => (
              <li 
                key={pokemon - index}
                className={`hover:bg-red-700 cursor-pointer ${
                  index < 10 ? "col-start-1" : "col-start-2"
                }`}
              >
                  <Link to={`/pokemon-details${pokemon.url.slice(-3)}`}>#{pokemon.url.slice(-3).slice(0,-1)} - {pokemon.name}</Link>
              </li>
            ))}
          </ol>
          <div className="navButtons">
            <Button
              style={{ marginTop: "20px", backgroundColor: "white" }}
              onClick={handlePreviousButton}
            >
              PREV
            </Button>
            <Button
              style={{ marginTop: "20px", backgroundColor: "white" }}
              onClick={handleNextButton}
            >
              NEXT
            </Button>
          </div>

          <ol className="text-white list-decimal">
            <p className="font-bold">What you need to do</p>
            {/* <li>
              Call pokeapi inside useEffect (remember to not cause infinite loop
              because you'll break pokeapi!) and save the response in state
              (useState)
            </li>
            <li>
              Display list of pokemons (pokeapi uses pagination so keep that in
              mind) like example below
            </li>
            <li>
              [Extra] Add buttons PREVIOUS - NEXT at the bottom so I can load
              next batch of pokemons
            </li>
            <li>
              Handle states:
              <p>Initial</p>
              <p>Loading</p>
              <p>Loaded</p>
              <p>Error</p>
            </li> */}
            <li>
              Create pokemon profile page, so when I click on selected pokemon I
              go to the specific page where I can see more details about pokemon
              (pokemonId, name, types and avatar). Refer to Favourites, you'll
              see an example. Remember about react-router you have to create new
              route for this and create separate component and separate Route.
            </li>
            <li>
              In detailed view I want to have{" "}
              <span className="font-bold">ADD TO FAVOURITE </span>button which
              will save selected pokemon to{" "}
              <span className="font-bold">localStorage</span> so later I can
              display it in Favourite component. [Extra] Maximum of 6, meaning
              if I add 7th pokemon the first one gets removed from the
              localStorage
            </li>
          </ol>
          <p className="text-white py-2">
            Example of what I want to see here is something like this
          </p>
        </>
      )}
    </Page>
  );
}
