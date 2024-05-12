import { useNavigate } from "@remix-run/react";
import "../tailwind.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-300 p-4">
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
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
        <li>
          <button onClick={() => navigate("/explore/trail-1")}>Explorer</button>
        </li>
      </ul>
    </div>
  );
}
