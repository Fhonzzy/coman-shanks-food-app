import Footer from "@/components/custom/Footer"
import Header from "@/components/custom/Header"
import Hero from "@/components/custom/Hero"

type Props = {
    children: React.ReactNode
}

function Layout({children}: Props) {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        <div className="container mx-auto flex-1 py-10">
            {children}
        </div>
        <Footer />
    </div>
  )
}


export default Layout
