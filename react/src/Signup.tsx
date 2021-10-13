import React, { useState, useContext, useEffect, SyntheticEvent } from "react";
import { navigate, Link, RouteComponentProps } from "@reach/router";

import api from "./api";
import { UserContext } from "./userContext";

const Signup = (props: RouteComponentProps) => {
    const { setLoggedIn } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [serverError, setServerError] = useState("");



    useEffect(() => {
        setFormValid(email.length >0 && password.length>0 && password === confirmedPassword);
    }, [email, password, confirmedPassword]);

    const submitSignUp = (event: SyntheticEvent) => {
        // Don't allow page reload on submit
        event.preventDefault();
        api.post("/users/", { email: email, password: password })
            .then(res => {
                setLoggedIn(true);
                navigate("/");
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setServerError(error.response.data.message);
                } else {
                    throw error;
                }
            });
    };
    // Refer to https://www.theparsedweb.com/user-authentication-with-flask-and-react/ to implement OAuth w/ Google
    // const oAuth2SignUp = () => {
    //     document.querySelector("#oauth2signupform")?.submit()
    // }
    return (
        <div>
            <div>
                <h1>Create an account</h1>
                <form onSubmit={submitSignUp}>
                    <div>
                        <div>
                            <div>
                                <label htmlFor="email">Email</label>
                            </div>
                            <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                            <div className="form-error">{serverError}</div>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                        </div>
                        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <div className="form-error">
                            {password.length && password.length < 8 ? "Password must be more than 7 characters long." : ""}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="confirmedPassword">
                                Confirm Password
                            </label>
                        </div>
                        <input type="password" name="confirmedPassword" value={confirmedPassword} onChange={e => setConfirmedPassword(e.target.value)} />
                        <div className="form-error">
                            {confirmedPassword !== password && confirmedPassword.length >0 ? "Passwords don't match." : ""}
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={!formValid}>
                            Create Account
                        </button>
                        {/* <button onClick={oAuth2SignUp} className="centered" type="button">
                            Sign Up With Google
                        </button> */}
                    </div>
                    <div>
                        <Link to="/welcome/login">
                            Already have an account? Log in here.
                        </Link>
                    </div>
                </form>
                <form id="oauth2signupform" action="/users/oauth2signup/" method="POST"></form>
            </div>
        </div>
    );
};

export default Signup;