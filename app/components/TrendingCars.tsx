import { MapPin, Fuel, Gauge } from "lucide-react"
import { Badge } from "./ui/Badge"
import { Button } from "./ui/Button"
import { Card, CardContent } from "./ui/Card"

const cars = [
  {
    name: "Tesla Model S Plaid",
    price: "$89,990",
    year: "2024",
    mileage: "0 mi",
    fuel: "Electric",
    hp: "1,020 hp",
    location: "San Francisco, CA",
    badge: "Trending",
    image: "/placeholder-car.svg",
  },
  {
    name: "Porsche 911 Turbo S",
    price: "$149,900",
    year: "2023",
    mileage: "2,340 mi",
    fuel: "Gasoline",
    hp: "640 hp",
    location: "Miami, FL",
    badge: "Premium",
    image: "/placeholder-car.svg",
  },
  {
    name: "BMW i7 M70",
    price: "$112,500",
    year: "2024",
    mileage: "500 mi",
    fuel: "Electric",
    hp: "650 hp",
    location: "New York, NY",
    badge: "New",
    image: "/placeholder-car.svg",
  },
  {
    name: "Mercedes-AMG GT 63",
    price: "$135,200",
    year: "2023",
    mileage: "1,200 mi",
    fuel: "Gasoline",
    hp: "577 hp",
    location: "Los Angeles, CA",
    badge: "Featured",
    image: "/placeholder-car.svg",
  },
]

export default function TrendingCars() {
  return (
    <section id="cars" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Trending{" "}
              <span className="text-[#00D2FF]">Vehicles</span>
            </h2>
            <p className="mt-2 text-gray-400">
              Most sought-after cars on the Motora marketplace
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            View All
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => (
            <Card
              key={car.name}
              className="group overflow-hidden border-white/5 transition-all duration-300 hover:border-[#00D2FF]/20 hover:shadow-lg hover:shadow-[#00D2FF]/5"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#00D2FF]/10 to-[#0055FF]/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl">🚗</div>
                    <p className="mt-2 text-xs text-gray-500">
                      Car Image Placeholder
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="default">{car.badge}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-semibold text-white">{car.name}</h3>
                  <span className="text-sm font-bold text-[#00D2FF]">
                    {car.price}
                  </span>
                </div>
                <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {car.location}
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3 text-center text-xs">
                  <div>
                    <p className="text-gray-500">Year</p>
                    <p className="font-medium text-white">{car.year}</p>
                  </div>
                  <div>
                    <p className="flex items-center justify-center gap-1 text-gray-500">
                      <Fuel className="h-3 w-3" />
                    </p>
                    <p className="text-[11px] font-medium text-white">
                      {car.fuel}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center justify-center gap-1 text-gray-500">
                      <Gauge className="h-3 w-3" />
                    </p>
                    <p className="text-[11px] font-medium text-white">
                      {car.hp}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
