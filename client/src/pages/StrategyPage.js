import React, { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar.js";
import StrategyContainer from "../components/StrategyContainer.js";
import Footer from "../components/Footer.js";


function StrategyPage() {
    const [strategies, setStrategies] = useState([])

    useEffect(() => {
        fetch('/strategies')
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                throw Error('Network response was not ok.')
            })
            .then((strategiesData) => setStrategies(strategiesData));
    }, [])

    return (
        <div className="strategy-page">
            <NavBar />
            <StrategyContainer strategies={strategies} setStrategies={setStrategies}/>
            <Footer />
        </div>
    )
}

export default StrategyPage;