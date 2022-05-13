import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Layout from "../../src/components/Layout";
import Spinner from "../../src/components/Spinner";
import { fetchPokemon, fetchPokemons } from "../api";

const Pokemon: NextPage = ({ pokemon }: any) => {
  const router = useRouter();

  const id = typeof router.query?.id === "string" ? router.query.id : "";

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["getPokemon", id],
    () => fetchPokemon(id),
    {
      initialData: pokemon,
      enabled: !!id,
      staleTime: Infinity,
    }
  );

  const types = data?.types
    ? data.types.map((t: { type: { name: string } }) => t.type.name)
    : [];

  const moves = data?.moves
    ? data.moves.map((m: { move: { name: string } }) => m.move.name)
    : [];

  const stats = data?.stats
    ? data.stats.map((st: { base_stat: number; stat: { name: string } }) => ({
        name: st.stat.name,
        base_stat: st.base_stat,
      }))
    : [];

  const abilities = data?.abilities
    ? data.abilities.map((a: { ability: { name: string } }) => a.ability.name)
    : [];

  const renderResult = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      return (
        <div className="text-center text-lg text-red-600">
          Une erreur s'est produite!
        </div>
      );
    }
    if (isSuccess) {
      return (
        <div className="mt-16 w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
          <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
            {data && (
              <img
                src={
                  data.sprites.other.home.front_default ||
                  data.sprites.front_default
                }
                alt={data.name}
                className="object-center object-cover"
              />
            )}
          </div>
          <div className="sm:col-span-8 lg:col-span-7">
            <section aria-labelledby="information-heading" className="mt-2">
              <div className="py-5 lg:pt-2 lg:pb-16 lg:col-start-1 lg:col-span-2  lg:pr-8">
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-2">
                    <span className="text-sm font-normal text-gray-500">
                      Hauteur:{" "}
                      <span className="font-medium">{data?.height} m</span> /
                      Poid:{" "}
                      <span className="font-medium">{data?.weight} Kg</span> /
                      XP:{" "}
                      <span className="font-medium">
                        {data?.base_experience}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900">Type</h2>

                  <div className="mt-2">
                    <span className="text-sm capitalize font-normal text-gray-500">
                      {types ? types.join(" / ") : ""}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900">
                    Capacités
                  </h2>

                  <div className="mt-2">
                    <span className="text-sm capitalize font-normal text-gray-500">
                      {abilities ? abilities.join(" / ") : "-"}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900">
                    Statistiques
                  </h2>

                  <div className="mt-2">
                    <span className="text-sm font-normal text-gray-500">
                      {stats.map(
                        (
                          stat: { name: string; base_stat: number },
                          i: number
                        ) => (
                          <span className="capitalize" key={i}>
                            {stat.name}:{" "}
                            <span className="font-medium">
                              {stat.base_stat}
                            </span>
                            {stats.length !== i + 1 ? " / " : ""}
                          </span>
                        )
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900">
                    Mouvements
                  </h2>

                  <div className="mt-2">
                    <span className="text-sm capitalize font-normal text-gray-500">
                      {moves ? moves.join(" / ") : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }
    return <></>;
  };

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <button
              onClick={() => router.back()}
              type="button"
              className="p-2 mb-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Retour</span>
              <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <p className="uppercase mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {id}
            </p>
          </div>

          {renderResult()}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const pokemons = await fetchPokemons();

  const paths = pokemons?.results.map((pok: any) => ({
    params: { id: pok.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const pokemon = await fetchPokemon(params.id);
  return { props: { pokemon } };
}

export default Pokemon;
