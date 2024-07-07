import React, { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar.js";
import StrategyContainer from "../components/StrategyContainer.js";


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
        <main>
            <NavBar />
            <h1>HELLO</h1>
            <StrategyContainer strategies={strategies} setStrategies={setStrategies}/>
        </main>
    )
}

export default StrategyPage;