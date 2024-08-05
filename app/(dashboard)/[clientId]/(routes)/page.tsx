import Bubbles from "@/components/bubbles";
import EntryForm from "@/components/entry-form";
import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";

const Home = async ({ params }: { params: { clientId: string } }) => {
  const configs = await prismadb.configuration.findUnique({
    where: {
      clientId: params.clientId,
    },
  });

  return (
    <div className="mb-24 md:mb-7">
      <div className="canvas py-7 mb-7 px-3 lg:px-14 shadow">
        <Bubbles />
        <Heading
          title="Formulario de ingreso"
          description="Completá el formulario con los datos del vehículo ingresante."
        />
      </div>
      <EntryForm configurations={configs!} />
    </div>
  );
};

export default Home;
