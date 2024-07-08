"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { CarColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface CarClientProps {
  data: CarColumn[];
}

export const CarClient: React.FC<CarClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading
        title={`Historial de vehículos lavados (${data.length})`}
        description="Administra los vehículos que ya terminaron su proceso de lavado."
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="licensePlate" />
    </>
  );
};
