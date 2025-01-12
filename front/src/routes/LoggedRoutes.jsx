import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import AuthScreen from "../pages/AuthScreen";

export default function LoggedRoutes() {
    const { user } = useSelector((state) => state.user);
    
    return user ? <Outlet /> : <AuthScreen />;
}