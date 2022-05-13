import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../src/components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <img
              className="h-80 w-auto lg:mx-auto"
              src="https://media.moddb.com/images/games/1/68/67371/Logo.png"
              alt="Pokégens"
            />
            <p
              className="max-w-2xl text-xl text-gray-500 lg:mx-auto"
              style={{ marginTop: -20 }}
            >
              Bienvenu sur{" "}
              <span className="uppercase font-bold">Pokégens App</span>, un
              portail d'exploration et de découverte des différentes générations
              de pokémons.
            </p>
          </div>

          <div className="mt-10 max-w-md text-xl text-gray-500 lg:mx-auto">
            <div className="rounded-md shadow">
              <Link href="/generations" shallow passHref>
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Explorez les différente générations
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
