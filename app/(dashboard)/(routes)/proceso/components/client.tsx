"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CarColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface CarClientProps {
  data: CarColumn[];
  fullData: any;
}

export const CarClient: React.FC<CarClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Vehículos en proceso (${data.length})`}
        description="Administra los vehículos que están en proceso de lavado."
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="licensePlate" />
    </>
  );
};
