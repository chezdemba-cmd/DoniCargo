import CalculatorClient from "./calculator-client"

export const metadata = {
  title: "Calculateur IA Douane | DoniCargo",
  description: "Estimez vos taxes douanières selon le TEC UEMOA.",
}

export default function CalculatorPage() {
  return <CalculatorClient />
}

