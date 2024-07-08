"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CarColumn = {
  id: string;
  vehicle: string;
  phoneNumber: string;
  price: string;
  licensePlate: string;
  color: string;
  typeOfCarWash: string;
  createdAt: string;
  observations: string;
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
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "typeOfCarWash",
    header: "Tipo de lavado",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "observations",
    header: "Observaciones",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
