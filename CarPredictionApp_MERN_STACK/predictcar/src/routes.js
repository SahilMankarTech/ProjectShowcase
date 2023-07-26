import Dashboard from './Components/Dashboard';
import Login from "./Components/Login"
import Signup from './Components/Signup';
import Home from './Components/Home'
import Admin from './Components/Admin';

export const routes=[

    {path:'/',element:<Home/>},
    {path:'/login',element:<Login/>},
    {path:'/signup',element:<Signup/>},
    {path:'/dashboard',element:<Dashboard/>},
    {path:'/admin',element:<Admin/>},
]