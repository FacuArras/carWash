import axios from "axios";
import getConfigurations from "@/hooks/get-configurations";

function reemplazarPalabras(
  cadena: string,
  datos: { [key: string]: string }
): string {
  const reemplazos: { [key: string]: string } = {
    vehículo: datos.vehicle,
    vehiculo: datos.vehicle,
    color: datos.color,
    patente: datos.licensePlate,
    precio: datos.price,
    marca: datos.brand,
    tipo: datos.typeOfCarWash,
    ingreso: datos.createdAt,
  };

  return cadena.replace(/'([^']+)'/g, (match, p1) => {
    if (reemplazos[p1]) {
      return reemplazos[p1];
    }
    return match;
  });
}

export async function sendMessage(
  data: { [key: string]: string },
  clientId: string
) {
  try {
    const configs = await getConfigurations(clientId);
    const messageTemplate = configs.message;

    const mensajeReemplazado = reemplazarPalabras(messageTemplate, data);

    await axios.patch(`/api/${clientId}/vehicle/${data.id}/ready`, {
      washed: true,
    });

    window.open(`https://wa.me/${data.phoneNumber}?text=${mensajeReemplazado}`);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
