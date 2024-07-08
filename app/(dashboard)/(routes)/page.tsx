import EntryForm from "@/components/entry-form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  return (
    <div className="my-7">
      <Heading
        title="Formulario de ingreso"
        description="Completá el formulario con los datos del vehículo ingresante."
      />
      <Separator className="mt-5 mb-7" />
      <EntryForm />
    </div>
  );
};

export default Home;
