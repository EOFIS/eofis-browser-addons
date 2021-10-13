import React, { useState, useEffect } from "react";
import queryString from "querystring";

import api from "./api";
import { RouteComponentProps } from "@reach/router";

const Activate = (props: RouteComponentProps) => {
    const [activating, setActivating] = useState(true);
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        const queryParams = queryString.parse(window.location.search.slice(1));
        api.post("/users/activate/", {
            user_uuid: queryParams.user_uuid
        })
        .then(() => {
            setActivating(false);
            setActivated(true);
        })
        .catch(() => setActivating(false));
    }, []);

    const success = () => (
        <div>
            <h1>Account Activated</h1>
            <p>
                Your account is now active and you can use all the features available with your subscription.
            </p>
        </div>
    );
    const failure = () => (
        <div>
            <h1>Activation Failed</h1>
            <p>
                We're sorry, we couldn't activate your account. Please contact support if you're sure the code hasn't expired or your account hasn't already been activated.
            </p>
        </div>
    );

    return (
        <div>
            <div>
                {activating && <h1>Activating account, please wait ...</h1>}
                {!activating && activated && success()}
                {!activating && !activated && failure()}
            </div>
        </div>
    )
}

export default Activate;