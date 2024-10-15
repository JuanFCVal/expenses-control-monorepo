import {
    createBrowserRouter,
} from "react-router-dom";
import HomeContainer from "../pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeContainer></HomeContainer>,
    },
]);
