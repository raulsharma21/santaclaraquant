import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";   

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Raul Sharma",
    role: "President",
    description: "A math and computer science major interested in mathematical finance.",
    imageUrl: "/images/raulsharma.jpeg?height=200&width=200",
  },
  {
    name: "Tristan Poul",
    role: "Vice-President",
    description: "An economics major with a passion for data analytics.",
    imageUrl: "/images/tristanpoul.jpeg?height=200&width=200",
  },
  {
    name: "Toby Hoffman",
    role: "Treasurer",
    description: "A finance major with experience trading and investing.",
    imageUrl: "/images/tobyhoffman.jpeg?height=200&width=200",
  },
  {
    name: "Will Cote",
    role: "Head of Strategy",
    description: "A mathematics major with extensive experience with modelling and simulation.",
    imageUrl: "/images/willcote.jpeg?height=200&width=200",
  },
  {
    name: "Jeevan Brar",
    role: "Head of Operations",
    description: "An economics major and data analytics minor with experience in trading and business development.",
    imageUrl: "/images/jeevanbrar.jpeg?height=200&width=200",
  },
]

export default function TeamPage() {
  return (
    <div>
    <Header/>
    <div className="w-full bg-background py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-12">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader className="flex items-center justify-center pb-2">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="text-center flex-grow flex flex-col">
                <CardTitle className="mb-2">{member.name}</CardTitle>
                <p className="text-sm font-semibold text-muted-foreground mb-4">{member.role}</p>
                <p className="text-sm text-muted-foreground flex-grow">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}