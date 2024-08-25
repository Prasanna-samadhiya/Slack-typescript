import Footer from "../CreatedComponents/Footer/Footer"

interface Props {}

function Home(props: Props) {
    const {} = props

    return (
       <div>
         <div className="font-sans bg-gray-100 text-gray-900 w-screen absolute left-0 top-0">
      {/* Navbar */}
      <nav className="bg-purple-900 h-24">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <img src="https://a.slack-edge.com/3d92b39/marketing/img/nav/slack-salesforce-logo-nav-white@2x.png" className="w-40 ml-4 lg:ml-0" alt="logo"/>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-white hover:underline">Features</a></li>
            <li><a href="#" className="text-white hover:underline">Pricing</a></li>
            <li><a href="#" className="text-white hover:underline">About</a></li>
            <li><a href="#" className="text-white hover:underline">Sign In</a></li>
            <li>
              <a href="#" className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600">
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-slate-200 text-violet text-center py-24 h-[550px]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Where work happens</h1>
          <p className="text-lg md:text-xl mb-8">
            Slack is your digital HQ. Transform the way you work with the most powerful collaboration tool for teams.
          </p>
          <a href="#" className="bg-pink-500 text-white py-3 px-8 rounded-lg hover:bg-pink-400 font-semibold">
            Try Slack for Free
          </a>
        </div>
      </header>

      {/* Footer */}
      <Footer/>
    </div>
       </div>
    )
}

export default Home
