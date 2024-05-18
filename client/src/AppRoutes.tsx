import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./Layouts/layout"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout>Homepage</Layout>}/>
        <Route path="/user-profile" element={<span>User Profile</span>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
    </Routes>
  )
}

export default AppRoutes