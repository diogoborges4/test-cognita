import type { LinksFunction } from "@remix-run/node"
import Home from './routes/_index';
import Explorer from './routes/explore/trail-1'

import {
  Links,
  Meta,
  Outlet,
  Route,
  Routes,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Explorer />} />
      </Routes>

    </>
  );
}
