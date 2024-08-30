
import { Routes,Route } from '../node_modules/react-router-dom/dist/index'
import './App.css'
import PrivateRoute from './CreatedComponents/Private Route/PrivateRoute'
import Root from './googleauth/auth'
import CreateWorkspace from './pages/CreateWorkspace'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Register2 from './pages/Register2'
import Registerfrominvite from './pages/RegisterFromInvite'
import SendInvite from './pages/SendInvite'
import SignedHome from './pages/SignedHome'
import WorkspaceHome from './pages/WorkspaceHome'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signedinhome" element={<SignedHome/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/register2" element={<Register2/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/googleauth" element={<Root/>}></Route>
        <Route path="/registerfrominvite" element={<Registerfrominvite/>}></Route>
        <Route element={<PrivateRoute/>}>
        <Route path="/workspacehome" element={<WorkspaceHome/>}></Route>
        <Route path="/sendinvite" element={<SendInvite/>}></Route>
        <Route path="/createworkspace" element={<CreateWorkspace/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
