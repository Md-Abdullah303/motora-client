export type CarStatus = "Available" | "Sold"

export type Car = {
  id: string
  title: string
  category: string
  price: number
  status: CarStatus
  image: string
  description: string
  year: number
}

export type Transaction = {
  id: string
  carTitle: string
  amount: number
  date: string
  receiptUrl: string
}

export type Sale = {
  id: string
  carTitle: string
  buyer: string
  payout: number
  date: string
  status: "Completed" | "Pending"
}

export const MOCK_CARS: Car[] = [
  { id: "1", title: "Tesla Model S Plaid", category: "Sedan", price: 89990, status: "Available", image: "/placeholder.svg", description: "Electric sedan with insane performance.", year: 2024 },
  { id: "2", title: "BMW X7 M50i", category: "SUV", price: 75990, status: "Available", image: "/placeholder.svg", description: "Luxury SUV with V8 power.", year: 2024 },
  { id: "3", title: "Porsche 911 Turbo S", category: "Coupe", price: 159990, status: "Sold", image: "/placeholder.svg", description: "Iconic sports car.", year: 2023 },
  { id: "4", title: "Mercedes-Benz EQS", category: "Sedan", price: 99990, status: "Available", image: "/placeholder.svg", description: "Electric luxury flagship.", year: 2024 },
  { id: "5", title: "Audi RS6 Avant", category: "Wagon", price: 89990, status: "Sold", image: "/placeholder.svg", description: "Performance wagon.", year: 2023 },
]

export const MOCK_PURCHASES: Transaction[] = [
  { id: "txn_001", carTitle: "Porsche 911 Turbo S", amount: 159990, date: "2024-12-15", receiptUrl: "#" },
  { id: "txn_002", carTitle: "Audi RS6 Avant", amount: 89990, date: "2024-11-20", receiptUrl: "#" },
]

export const MOCK_SALES: Sale[] = [
  { id: "sale_001", carTitle: "Porsche 911 Turbo S", buyer: "John D.", payout: 149990, date: "2024-12-15", status: "Completed" },
  { id: "sale_002", carTitle: "Audi RS6 Avant", buyer: "Sarah K.", payout: 84990, date: "2024-11-20", status: "Completed" },
]

export const MOCK_CHART_DATA = [
  { month: "Jan", sales: 4000, expenses: 2400 },
  { month: "Feb", sales: 3000, expenses: 1398 },
  { month: "Mar", sales: 9800, expenses: 4000 },
  { month: "Apr", sales: 3908, expenses: 3000 },
  { month: "May", sales: 4800, expenses: 2000 },
  { month: "Jun", sales: 6000, expenses: 3500 },
  { month: "Jul", sales: 7500, expenses: 4200 },
]

export const AI_RECOMMENDED_CARS = [
  {
    id: "ai_1",
    title: "Lucid Air Grand Touring",
    category: "Sedan",
    price: 115000,
    image: "/placeholder.svg",
    badge: "AI Recommended",
    reason: "Matches your preference for electric luxury sedans",
  },
  {
    id: "ai_2",
    title: "Range Rover Sport",
    category: "SUV",
    price: 89990,
    image: "/placeholder.svg",
    badge: "AI Recommended",
    reason: "Based on your search history in premium SUVs",
  },
  {
    id: "ai_3",
    title: "McLaren Artura",
    category: "Coupe",
    price: 229990,
    image: "/placeholder.svg",
    badge: "AI Recommended",
    reason: "High-performance hybrid you might love",
  },
]
