"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Instagram, Mail } from "lucide-react"
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';


export function LandingPage() {
  const [showSecondScreen, setShowSecondScreen] = useState(false)
  const [showLanding, setShowLanding] = useState(false)
  const secondScreenRef = useRef<HTMLDivElement>(null)
  const landingRef = useRef<HTMLDivElement>(null)


  // const particlesInit = useCallback(async (engine: Engine) => {
  //   await loadFull(engine)
  // }, [])

  // const particlesLoaded = useCallback(async (container: Container | undefined) => {
  //   await console.log(container)
  // }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSecondScreen(true)
        }
      },
      { threshold: 0.1 }
    )

    if (secondScreenRef.current) {
      observer.observe(secondScreenRef.current)
    }

    return () => {
      if (secondScreenRef.current) {
        observer.unobserve(secondScreenRef.current)
      }
    }
  }, [])

  const handleMailingListSignup = () => {
    console.log("Mailing list signup clicked")
    // Handle mailing list signup here
  }

  useEffect(() => {
    // Show the landing section immediately or with minimal delay
    const timer = setTimeout(() => {
      setShowLanding(true)
    }, 0) // Minimal delay to ensure smooth transition

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      {/* <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000000",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      /> */}
      <Header />
      <main className="flex-1 z-10">
        <section ref={landingRef} className={`w-full section-minus-navbar h-screen flex justify-center items-center bg-[url('/images/SCQBackground.jpg')] bg-cover bg-center transition-opacity duration-500 ${showLanding ? 'opacity-100' : 'opacity-0'}`}>

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Santa Clara Quant
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Santa Clara University's Quantitative Finance Organization
              </p>
              {/* <Button className="mt-6 bg-white text-black hover:bg-gray-200">Learn More</Button> */}
            </div>
          </div>
        </section>

        <section ref={secondScreenRef} className="w-full py-12 md:py-24 lg:py-24 flex justify-center">
          <div className={`container px-4 md:px-6 transition-opacity duration-1000 ${showSecondScreen ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Our Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Algorithmic Trading</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Developing and backtesting quantitative trading strategies using machine learning algorithms.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/projects">
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      Read More
                    </Button>
                  </Link>                </CardFooter>
              </Card>
              <Card className="bg-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Risk Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Building models to assess and manage financial risks in investment portfolios.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/projects">
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      Read More
                    </Button>
                  </Link>                </CardFooter>
              </Card>
              <Card className="bg-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Blockchain Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Analyzing blockchain data to derive insights and predict cryptocurrency market trends.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/projects">
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      Read More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}