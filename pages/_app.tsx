import Head from "next/head";
import { useState } from "react";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import type { AppProps } from "next/app";
import Sidebar from "@/components/layout/sidebar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps<{initialSession: Session}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>Dialogue Craft</title>
        <meta name="description" content="Make your movie dialogues using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="../styles/globals.css" />
      </Head>

      <Sidebar />
      <main className="lg:ml-60 mr-4 flex-grow py-4 h-screen">
        <div className="mx-auto max-w-6xl p-6 rounded-lg shadow-md bg-slate-800">
          <Component {...pageProps} />
        </div>
      </main>
    </SessionContextProvider>
  );
}
