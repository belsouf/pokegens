import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";
import { IGeneration } from "../../src/interfaces/IGeneration";
import Layout from "../../src/components/Layout";
import Spinner from "../../src/components/Spinner";

const fetchGenerations = () =>
  axios
    .get("https://pokeapi.co/api/v2/generation")
    .then((response: any) => response.data);

const Generations: NextPage = () => {
  const { isSuccess, data, isLoading, isError } = useQuery(
    ["getGenerations"],
    () => fetchGenerations(),
    {
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
        <dl className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-5">
          {data?.results.map((gen: IGeneration, i: number) => (
            <Link key={i} href={`/generations/${gen.name}`} shallow>
              <div className="relative bg-slate-200 py-2 px-5 rounded-md text-center text-lg cursor-pointer uppercase">
                {gen.name}
              </div>
            </Link>
          ))}
        </dl>
      );
    }
    return <></>;
  };

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Pokémons
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Liste des générations
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Choisissez une génération pour affichier les pokémons associés
            </p>
          </div>

          <div className="mt-10">{renderResult()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Generations;
