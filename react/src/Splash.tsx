import React from "react";
import {Router, navigate, RouteComponentProps} from "@reach/router";

import Activate from "./Activate";
import Signup from "./Signup";
import Login from "./Login";
import { openMainPage } from "./background";

const Splash = (props: RouteComponentProps) => {
    return (
        <div>
            <div>
                <h1 onClick={() => navigate("/")}>EoFis</h1>
                <div>
                    <h2>Remember anything. Repeatably. Reliably.</h2>
                    <p>Remember whatever, whenever. Try our free trial or our premium and enterprise plans (coming soon!).</p>
                    <button onClick={openMainPage}>Open in main page</button>
                </div>
            </div>
            <div>
                <Router style={{height : "100%"}}>
                    <Activate path="activate"/>
                    <Signup path="signup"/>
                    <Login path="login"/>
                </Router>
            </div>
        </div>
    );
}

export default Splash;