import Bubbles from "@/components/bubbles";
import EntryForm from "@/components/entry-form";
import { Heading } from "@/components/ui/heading";
import { Toaster } from "react-hot-toast";

const Home = async ({ params }: { params: { clientId: string } }) => {
  return (
    <div className="mb-24 md:mb-7">
      <Toaster />
      <div className="canvas py-7 mb-7 px-3 lg:px-14 shadow">
        <Bubbles />
        <Heading
          title="Formulario de ingreso"
          description="Completá el formulario con los datos del vehículo ingresante."
        />
      </div>
      <EntryForm />
    </div>
  );
};

export default Home;
