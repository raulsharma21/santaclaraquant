'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Header from '@/components/ui/header'; // Adjust the import path if necessary
import Footer from '@/components/ui/footer'; // Adjust the import path if necessary
import Image from 'next/image';


const projects = [
  {
    id: 1,
    title: "Interactive Options Pricing Model",
    description: "Developed a Black-Scholes model for pricing European options with adjustments for changes in volatility and market conditions.",
    image: "/images/BS.png?height=200&width=300",
    link: "https://tristanpoul25.shinyapps.io/BSM-Pricing-Model/"
  },
  {
    id: 2,
    title: "Double Moving Average Strategy",
    description: "Implemented a moved-average crossovers strategy using R to better returns and reduce risk on an equity.",
    image: "/images/DoubleMA.png?height=200&width=300",
    link: "https://tristanpoul25.shinyapps.io/DoubleMA/"
  },
  {
    id: 3,
    title: "Arbitrage Sports Betting Algorithm",
    description: "Designed a web scraping and betting strategy using odds from multiple books and statistical arbitrage.",
    image: "/images/SportsBetting.png?height=200&width=300",
    link: "https://github.com/raulsharma21/OddsScraper"
  }
]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-red-900/50 hover:bg-gray-700 flex flex-col">
              <CardHeader className="p-6 pb-0">
                <div className="overflow-hidden rounded-lg mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}  // Set a specific width (adjust as needed)
                    height={200} // Set a specific height (adjust as needed)
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardTitle className="text-xl font-semibold text-white">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-6 py-4">
                <CardDescription className="text-gray-300">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="px-6 py-4">
                <Link href={project.link} passHref className="w-full" target="_blank">
                  <Button className="w-full bg-[#b30738] hover:bg-[#990630] text-white">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}