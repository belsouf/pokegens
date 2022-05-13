import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Layout from "../../src/components/Layout";
import PokemonCard from "../../src/components/PokemonCard";
import Spinner from "../../src/components/Spinner";
import { fetchGenerations, fetchGeneration } from "../api";

const Generation: NextPage = ({ generation }: any) => {
  const router = useRouter();
  const id = typeof router.query?.id === "string" ? router.query.id : "";

  const [index, setIndex] = useState(0);
  const [pokemons, setPokemons] = useState(
    generation?.pokemon_species.slice(index, 8) || []
  );

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["getGeneration", id],
    () => fetchGeneration(id),
    {
      initialData: generation,
      enabled: !!id,
      staleTime: 900000000000000000,
      onSuccess: (data: any) => {
        setPokemons(data?.pokemon_species.slice(index, 8));
        setIndex(8);
      },
    }
  );

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
        <>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {pokemons.map((pok: { name: string }, i: number) => (
              <PokemonCard key={i} name={pok.name} />
            ))}
          </div>

          {data && pokemons.length < data.pokemon_species.length && (
            <div className="mt-10 max-w-md text-xl text-gray-500 lg:mx-auto">
              <div className="rounded-md shadow">
                <button
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  onClick={() => {
                    setPokemons([
                      ...pokemons,
                      ...data.pokemon_species.slice(index, index + 8),
                    ]);
                    setIndex(index + 8);
                  }}
                >
                  Afficher plus
                </button>
              </div>
            </div>
          )}
        </>
      );
    }
    return <></>;
  };

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <Link href="/generations" shallow passHref>
              <a
                type="button"
                className="p-2 mb-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Retour</span>
                <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </Link>

            {data && (
              <>
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                  Région: {data.main_region.name}
                </h2>
                <p className="uppercase mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {data.name}
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Clickez sur un pokémon pour afficher les informations
                </p>
              </>
            )}
          </div>

          <div className="mt-10">{renderResult()}</div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const generations = await fetchGenerations();

  const paths = generations?.results.map((gen: any) => ({
    params: { id: gen.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const generation = await fetchGeneration(params.id);
  return { props: { generation } };
}

export default Generation;
