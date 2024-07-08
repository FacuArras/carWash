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
};

export const columns: ColumnDef<CarColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Hora de ingreso",
  },
  {
    accessorKey: "licensePlate",
    header: "Patente",
  },
  {
    accessorKey: "phoneNumber",
    header: "Teléfono",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "typeOfCarWash",
    header: "Tipo de lavado",
  },
  { accessorKey: "price", header: "Precio" },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
