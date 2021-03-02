import { Title } from "../../components/title";
import { Page } from "../../components/page";
import { Button } from "@material-ui/core";

const examplePokemon = {
  id: 1,
  name: "bulbasaur",
  avatar:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/1.png",
  types: [
    {
      slot: 1,
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
    },
  ],
};

export const PokemonDetails = () => {
  return (
    <Page>
      <Title>Here will be pokemon name</Title>
      <div className="pokemonDetails">
        <PokemonProfile
          name={examplePokemon.name}
          types={examplePokemon.types}
          avatar={examplePokemon.avatar}
          number={examplePokemon.id}
        />
        <Button
          style={{ marginTop: "20px", backgroundColor: "white" }}
          // onClick={handleNextButton}
        >
          add to favourites
        </Button>
      </div>
    </Page>
  );
};

const PokemonProfile = ({ number, name, types, avatar }) => {
  return (
    <figure className="max-w-xs bg-gray-100 rounded-xl p-4">
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src={avatar}
        alt=""
        width="384"
        height="512"
      />
      <div className="pt-4 text-center">
        <figcaption className="font-medium">
          <div className="text-cyan-600">
            #{number} {name}
          </div>
          <div className="text-gray-500">
            {types.map(({ type }) => type.name).join(", ")}
          </div>
        </figcaption>
      </div>
    </figure>
  );
};
