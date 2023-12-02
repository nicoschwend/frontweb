import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "../LandingPage/Start";
import Instrucciones from "./instrucciones";
import Pagprincipal from "./Pagprincipal";
import SignIn from "../Profile/SignIn";
import SignUp from "../Profile/SignUp";
import UserCheck from "../protected/UserCheck";
import AdminCheck from "../protected/AdminCheck";
import UsersList from "../protected/UserList";
import Reminder from "../LandingPage/reminder";
import Notificacion from "../LandingPage/notification";


function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/principal"} element={<Pagprincipal />} />
                <Route path={"/"} element={<Start />} />
                <Route path={"/instrucciones"} element={<Instrucciones />} />
                <Route path={"/signin"} element={<SignIn />} />
                <Route path={"/signup"} element={<SignUp />} />
                <Route path={"/usercheck"} element={<UserCheck />} />
                <Route path={"/admincheck"} element={<AdminCheck />} />
                <Route path={"/userlist"} element={<UsersList />} />
                <Route path={"/LandingPage/reminder"} element={<Reminder />} />
                <Route path={"/LandingPage/notification"} element={<Notificacion />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
