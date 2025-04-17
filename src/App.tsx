import {createBrowserRouter} from 'react-router'
import { Home } from './pages/home'
import { Admin } from './pages/admin'
import { Login } from './pages/login'
import { Networks } from './pages/networks'
import { Teste } from './pages/teste/teste'
import { Error } from './pages/error'

import { Private } from './routes/private'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/admin',
    element: <Private><Admin/></Private>
  },
  {
    path: '/admin/social',
    element: <Private><Networks/></Private>
  },
  {
    path: '/teste',
    element: <Teste/>
  },
  {
    path: "*",
    element:<Error/>
  }
])

export {router}