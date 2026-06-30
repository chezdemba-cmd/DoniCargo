import { getShipments } from "@/services/shipments"
import ShipmentsClient from "./shipments-client"

export const metadata = {
  title: "Suivi des Marchandises | DoniCargo",
  description: "Pilotez le transit de vos marchandises de bout en bout.",
}

export default async function ShipmentsPage() {
  const data = await getShipments()
  return <ShipmentsClient initialData={data} />
}
