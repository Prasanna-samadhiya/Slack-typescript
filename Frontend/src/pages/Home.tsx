import { Link } from "react-router-dom"
import Footer from "../CreatedComponents/Footer/Footer"
import Navbar from "../CreatedComponents/Navbar/Navbar"

interface Props {}

function Home(props: Props) {
    const {} = props

    return (
       <div>
         <div className="font-sans bg-gray-100 text-gray-900 w-screen absolute left-0 top-0">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <header className="bg-slate-200 text-violet text-center py-24 h-[550px]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Where work happens</h1>
          <p className="text-lg md:text-xl mb-8">
            Slack is your digital HQ. Transform the way you work with the most powerful collaboration tool for teams.
          </p>
          <Link to="/register" className="bg-pink-500 text-white py-3 px-8 rounded-lg hover:bg-pink-400 font-semibold">
            Try Slack for Free
          </Link>
        </div>
      </header>

      {/* Footer */}
      <Footer/>
    </div>
       </div>
    )
}

export default Home
