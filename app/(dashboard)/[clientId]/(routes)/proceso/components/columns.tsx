import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { sendMessage } from "@/actions/send-message";
import { useParams, useRouter } from "next/navigation";
import { CellAction } from "./cell-action";
import toast from "react-hot-toast";
import { useState } from "react";

export type CarColumn = {
  id: string;
  vehicle: string;
  phoneNumber: string;
  price: string;
  licensePlate: string;
  color: string;
  typeOfCarWash: string;
  brand: string;
  createdAt: string;
  observations: string;
  washed: boolean;
};

const WashCheckbox = ({ row }: { row: any }) => {
  const params = useParams();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const handleChange = async (value: boolean) => {
    setChecked(true);

    if (value) {
      const data = {
        id: row.original.id,
        vehicle: row.original.vehicle,
        color: row.original.color,
        licensePlate: row.original.licensePlate,
        price: row.original.price,
        typeOfCarWash: row.original.typeOfCarWash,
        createdAt: row.original.createdAt,
        brand: row.original.brand,
        phoneNumber: row.original.phoneNumber,
      };

      const clientId = Array.isArray(params.clientId)
        ? params.clientId[0]
        : params.clientId;

      if (clientId) {
        await sendMessage(data, clientId);

        toast.success("Vehículo lavado!");

        setChecked(false);
        router.refresh();
      }
    }
  };

  return (
    <div className="pr-4">
      <Checkbox
        checked={checked}
        onCheckedChange={handleChange}
        aria-label="Lavado"
      />
    </div>
  );
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
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "observations",
    header: "Observaciones",
  },
  {
    accessorKey: "washed",
    header: "¿Lavado?",
    cell: ({ row }) => <WashCheckbox row={row} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
