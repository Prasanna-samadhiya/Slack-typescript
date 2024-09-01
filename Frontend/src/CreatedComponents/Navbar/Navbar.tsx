import { Link } from "react-router-dom"

interface Props {}

function Navbar(props: Props) {
    const {} = props

    return (
        <div>
           <nav className="bg-purple-900 h-24">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <img src="https://a.slack-edge.com/3d92b39/marketing/img/nav/slack-salesforce-logo-nav-white@2x.png" className="w-40 ml-4 lg:ml-0" alt="logo"/>
          <ul className="flex space-x-6">
            <li><Link to="" className="text-white hover:underline">Features</Link></li>
            <li><Link to="" className="text-white hover:underline">Pricing</Link></li>
            <li><Link to="" className="text-white hover:underline">About</Link></li>
            <li><Link to="/login" className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600">Sign In</Link></li>
            <li>
              <Link to="/register" className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600">
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </nav>
        </div>
    )
}

export default Navbar
