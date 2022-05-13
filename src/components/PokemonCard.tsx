import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";

interface PokemonCardProps {
  name: string;
}

const fetchPokemon = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response: any) => response.data);

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
}: PokemonCardProps) => {
  const { data } = useQuery(["getPokemon", name], () => fetchPokemon(name), {
    enabled: !!name,
    staleTime: Infinity,
  });
  return (
    <div className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        {data && (
          <img
            src={
              data.sprites.other.home.front_default ||
              data.sprites.front_default
            }
            alt={name}
            className="w-full h-full object-center object-contain lg:w-full lg:h-full"
          />
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <div>
          <h3 className="text-sm text-gray-700 font-bold">
            <Link href={`/pokemon/${name}`} passHref shallow>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {name}
              </a>
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
