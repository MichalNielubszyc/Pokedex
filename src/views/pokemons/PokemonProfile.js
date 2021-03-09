

export const PokemonProfile = ({ number, name, types, avatar, exp, height, weight, abilities }) => {
    return (
      <figure
        className="max-w-xs bg-gray-100 rounded-xl p-4"
        style={{ padding: "0 0 10px", marginBottom: "20px" }}
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