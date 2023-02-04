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
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet" />
      </Head>

      <Sidebar />
      <main className="lg:ml-64 flex-grow py-4 h-screen">
        <div className="mx-auto max-w-6xl p-6 flex flex-col gap-8 rounded-lg shadow-md bg-slate-800">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}
