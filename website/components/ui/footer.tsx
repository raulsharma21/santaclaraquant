import { Linkedin, Instagram, Mail } from "lucide-react";
import Link from "next/link"
import { Button } from "./button";

const Footer = () => {
return(
<footer className="w-full py-6 bg-black-800 z-10 flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://www.linkedin.com/company/santa-clara-quant" className="text-white hover:text-gray-300" target="_blank">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="mailto:contact@santaclaraquant.com" className="text-white hover:text-gray-300">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <div className="flex justify-center">
              <Button className="bg-white text-black hover:bg-gray-200">
                <Link href="https://forms.gle/EcDpQdNGLALuk4to8" target="_black" rel="noreferrer">
                  Sign up to our mailing list
                </Link>
              </Button>
            </div>
            <div className="text-center md:text-right text-sm text-gray-400">
              ©2024 by Santa Clara Quant
            </div>
          </div>
        </div>
      </footer>
)};

export default Footer;