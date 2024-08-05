"use client";

import { CarColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Toaster } from "react-hot-toast";

interface CarClientProps {
  data: CarColumn[];
}

export const CarClient: React.FC<CarClientProps> = ({ data }) => {
  return (
    <div className="px-3 lg:px-14">
      <p className="text-lg my-4">
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
    </div>
  );
};
