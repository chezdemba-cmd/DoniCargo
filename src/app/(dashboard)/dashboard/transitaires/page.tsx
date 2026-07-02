import { getTransitaires } from "@/services/transitaires"
import TransitairesClient from "./transitaires-client"

export const metadata = {
  title: "Transitaires | DoniCargo",
  description: "Marketplace des Transitaires. Comparez et collaborez avec des transitaires professionnels agréés douane.",
}

export default async function TransitairesPage() {
  // Fetch data on the server side
  const data = await getTransitaires()
  
  // Pass data to the client component
  return <TransitairesClient initialData={data} />
}

