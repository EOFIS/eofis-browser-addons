import React from "react";
import { Router } from "@reach/router";
import logo from './logo.svg';

// import Sidebar from "../components/Sidebar";
// import ProxyList from "../components/ProxyList";
// import DomainList from "../components/DomainList";

import styles from "./Home.module.css";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebarContainer}>
                {/* <Sidebar/> */}
                Sidebar
            </div>
            <Router className={styles.routeContainer}>
                Main content
                <img src={logo} className="App-logo" alt="logo" />

                {/* <ProxyList path="proxies" default/>
                <DomainList path="domains"/> */}
            </Router>
        </div>
    );
}

export default Home;