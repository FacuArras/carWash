"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { CarColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

interface CarClientProps {
  data: CarColumn[];
}

export const CarClient: React.FC<CarClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="px-3 lg:px-14">
      <p className="text-md my-4">
        Total lavados hasta el momento:{" "}
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
          "createdAt",
        ]}
      />
    </div>
  );
};
