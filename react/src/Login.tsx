import React, { useState, useContext, useEffect, SyntheticEvent } from "react";
import { navigate, Link, RouteComponentProps } from "@reach/router";
import { AxiosError, AxiosResponse } from "axios";

import api from "./api";
import { UserContext } from "./userContext";
import { AuthRequest, AuthResponse } from "./responses";

const Login = (props: RouteComponentProps) => {
    const { setLoggedIn } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        setFormValid(email.length > 0 && password.length > 0);
    }, [email, password]);

    const submitLogin = (event : SyntheticEvent) => {
        event.preventDefault();

        api.post<AuthRequest>("/auth/", {email: email, password: password})
        .then((response: AxiosResponse<AuthRequest>) => {
            setLoggedIn(true);
            // TODO: redirect user to wherever they were trying to access before
            navigate("/");
        })
        .catch((error: AxiosError<AuthResponse>) => {
            if (error.response && error.response.status === 401) {
                setServerError(error.response.data.msg);
            } else {
                throw error;
            }
        });
    };

    // const oAuth2Login = () => {document.querySelector("#oauth2loginform")?.submit()}
    return (
        <div>
            <div>
                <h1>Sign In</h1>
                <form onSubmit={submitLogin}>
                    <div>
                        <div>
                            <div>
                                <label htmlFor="email">Email</label>
                            </div>
                            <input type="text" name="email" value={email} onChange={e=> setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="password">Password</label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="formError">{serverError}</div>
                        </div>
                        <div>
                            <button type="submit" disabled={!formValid}>
                                Sign In
                            </button>
                            {/* <button onClick={oAuth2Login} className="centered" type="button">Sign In With Google</button> */}
                        </div>
                        <div>
                            <Link to="/welcome/signup">
                                Don't have an account? Create one here.
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <form id="oauth2loginform" action="/users/oauth2login/" method="POST"></form>
        </div>
    );
};

export default Login;