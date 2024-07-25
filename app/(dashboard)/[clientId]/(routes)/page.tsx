import EntryForm from "@/components/entry-form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";

const Home = async ({ params }: { params: { clientId: string } }) => {
  const configs = await prismadb.configuration.findUnique({
    where: {
      clientId: params.clientId,
    },
  });

  return (
    <div className="mt-7 mb-24 md:mb-7">
      <Heading
        title="Formulario de ingreso"
        description="Completá el formulario con los datos del vehículo ingresante."
      />
      <Separator className="my-6" />
      <EntryForm configurations={configs!} />
    </div>
  );
};

export default Home;
