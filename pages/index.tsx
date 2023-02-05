import DialogForm from "@/components/dialog/dialog-form";
import useCohere from "@/services/useCohere";


export default function Home() {
  const { data, isLoading, error, fetchData } = useCohere();
  if (error) console.error(error);

  return (
    <div className="flex flex-col">
      <h1 className="mb-6 text-5xl font-bold">Get a new dialog</h1>
      <p>Here you will input your characters and description</p>

      <DialogForm isLoading={isLoading} fetchData={(p: string) => fetchData(p)} />

      {data && (
        <div className="mt-8 bg-slate-700 p-4 rounded-lg">
          <pre className="max-w-[70ch] whitespace-pre-wrap leading-9">{data}</pre>
        </div>
      )}
    </div>
  );
}
