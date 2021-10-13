import { Redirect, RouteComponentProps } from "@reach/router";
import { ReactElement, useContext } from "react";
import { UserContext } from "./userContext";

interface IProtectedRouteProps extends RouteComponentProps {
    component: () => ReactElement<any, any>
};

const ProtectedRoute = (props: IProtectedRouteProps) : ReactElement<any, any> => {
    const { loggedIn } = useContext(UserContext);

    return loggedIn ? (
        props.component()
    ) : (
        <Redirect from="" to="welcome/login" noThrow />
    );
};

export default ProtectedRoute;