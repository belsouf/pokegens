import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { IGeneration } from "../../src/interfaces/IGeneration";
import Layout from "../../src/components/Layout";
import PokemonCard from "../../src/components/PokemonCard";
import Spinner from "../../src/components/Spinner";
import Link from "next/link";

const fetchGeneration = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/generation/${id}`)
    .then(({ data }) => data);

const Generation: NextPage = () => {
  const router = useRouter();
  const id = typeof router.query?.id === "string" ? router.query.id : "";

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["getGeneration", id],
    () => fetchGeneration(id),
    {
      enabled: !!id,
      staleTime: Infinity,
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
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.pokemon_species.map((pok: { name: string }, i: number) => (
            <PokemonCard key={i} name={pok.name} />
          ))}
        </div>
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

export default Generation;
