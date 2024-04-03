import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchTVSeasonWatchProviders } from "tmdb-client";
import logo from "../images/logo.png";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const { results } = await fetchTVSeasonWatchProviders(60572, 1);
  return json(results);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <nav>
        <img src={logo} alt="Just Watch Pokemon logo" />
      </nav>
      <ul>
        <li>
          {JSON.stringify(data)}
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutor
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
