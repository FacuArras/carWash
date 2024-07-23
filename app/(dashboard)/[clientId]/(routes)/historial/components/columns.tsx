"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CarColumn = {
  id: string;
  price: string;
  licensePlate: string;
  color: string;
  phoneNumber: string;
  typeOfCarWash: string;
  createdAt: string;
  brand: string;
  observations: string;
};

export const columns: ColumnDef<CarColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Ingreso",
  },
  {
    accessorKey: "licensePlate",
    header: "Patente",
  },
  {
    accessorKey: "brand",
    header: "Marca",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "typeOfCarWash",
    header: "Tipo",
  },
  { accessorKey: "price", header: "Precio" },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
