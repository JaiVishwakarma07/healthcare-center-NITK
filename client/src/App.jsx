import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from "./pages/login/Login"
import './App.css'
import Home from "./pages/home/Home"
import { useContext } from "react"
import { AuthContext } from "./context/authContext"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Appointments from "./pages/appointments/Appointments"
import BookAppointment from "./pages/bookAppointment/BookAppointment"
import SelectDoctor from "./components/selectDoctor/SelectDoctor"
import Report from "./pages/report/Report"
import Doctor from "./pages/doctor/Doctor"
import Diagnosis from "./pages/diagnosis/Diagnosis"
import Dummy from "./pages/dummy/Dummy"
import Pharmacy from "./pages/pharmacy/Pharmacy"
import MedicineRecords from "./pages/medicineRecords/MedicineRecords"
import Admin from "./pages/admin/Admin"
import AddUser from "./pages/adduser/AddUser"
import AddDoctor from "./pages/addDoctor/AddDoctor"
import UpdateUser from "./pages/updateUser/UpdateUser"
import UpdateDoctor from "./pages/updateDoctor/UpdateDoctor"
import AddMember from "./pages/addMember/AddMember"
import About from "./components/about/About"
import UpdateNoticeBoard from "./pages/updateNoticeBoard/UpdateNoticeBoard"
import AllNotice from "./pages/allNotice/AllNotice"
import SelectMember from "./pages/selectMember/SelectMember"

function App() {

  const { currentUser } = useContext(AuthContext);
  // const currentUser = true
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar/>
        <Outlet />
        <Footer/>
        </div>
      </QueryClientProvider>
    )
  }
 
  const ProtectRoutes = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  const goto = ()=>{
    if(currentUser && currentUser.userType === "doctor")return <Doctor/>
    else if(currentUser && currentUser.userType === "pharmacy")return <Pharmacy/>
    else if(currentUser && currentUser.userType === "Admin")return <Admin/>
    else return <Home/>
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectRoutes>
        <Layout />
      </ProtectRoutes>,
      children: [
        {
          path: "/",
          // element: currentUser && currentUser.userType === "doctor" ? <Doctor/> : currentUser && currentUser.userType === "pharmacy" ? <Pharmacy/> : <Home/>
          element : goto()
        },
        {
          path: "/myappointments",
          element: <Appointments />
        },
        {
          path: "/bookappointments",
          element: <BookAppointment />
        },
        {
          path: "/doctor/:specialisation",
          element: <SelectDoctor />
        },
        {
          path: "/report",
          element: <Report />
        },
        {
          path: "/diagnosis/:id/:patientid",
          element: <Diagnosis />
        },
        {
          path: "/dummy",
          element: <Dummy />
        },
        {
          path: "/medicineRecords",
          element: <MedicineRecords />
        },
        {
          path: "/admin/adduser",
          element: <AddUser />
        },
        {
          path: "/admin/adddoctor",
          element: <AddDoctor />
        },
        {
          path: "/admin/updateuser",
          element: <UpdateUser />
        },
        {
          path: "/admin/updatedoctor",
          element: <UpdateDoctor />
        },
        {
          path: "/admin/addmember",
          element: <AddMember />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/admin/updateNoticeBoard",
          element: <UpdateNoticeBoard />
        },
        {
          path: "/selectMember",
          element: <SelectMember />
        },
      ]
    },

    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/allNotice",
      element: <AllNotice />
    },
    ]
  )

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
