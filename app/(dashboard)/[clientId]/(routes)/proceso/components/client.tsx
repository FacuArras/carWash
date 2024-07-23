"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CarColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Toaster } from "react-hot-toast";

interface CarClientProps {
  data: CarColumn[];
}

export const CarClient: React.FC<CarClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Vehículos en proceso`}
        description="Administra los vehículos que están en proceso de lavado."
      />
      <Separator className="my-6" />
      <p className="text-md my-4">
        Total en proceso:{" "}
        <span className="font-bold tracking-wider">({data.length})</span>
      </p>
      <DataTable
        columns={columns}
        data={data}
        searchKeys={[
          "licensePlate",
          "brand",
          "color",
          "typeOfCarWash",
          "price",
          "observations",
          "createdAt",
        ]}
      />
      <Toaster />
    </>
  );
};
