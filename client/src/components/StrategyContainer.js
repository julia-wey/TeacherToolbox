import React from "react";
import StrategyCard from "./StrategyCard";

function StrategyContainer({strategies}) {
   const strategyCards = strategies.map((strategy) => {
    return <StrategyCard key={strategy.id} strategy={strategy} />;
   });
    
    return (
        <div className="strat-container">
            <h1 className="heading">Strategies for Teaching and Learning</h1>
            {strategyCards}
        </div>
    )
}
export default StrategyContainer;