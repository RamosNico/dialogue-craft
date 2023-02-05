import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/layout/sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hackathon</title>
        <meta name="description" content="My project for the co:here hackathon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="../styles/globals.css" />
      </Head>

      <Sidebar />
      <main className="lg:ml-64 flex-grow py-4 h-screen">
        <div className="mx-auto max-w-5xl p-6 rounded-lg shadow-md bg-slate-800">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}
