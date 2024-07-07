import React from "react";
import StrategyCard from "./StrategyCard";

function StrategyContainer({strategies}) {
   const strategyCards = strategies.map((strategy) => {
    return <StrategyCard key={strategy.id} strategy={strategy} />;
   });
    
    return (
        <main>
            <h1>Strategy Container Here</h1>
            {strategyCards}
        </main>
    )
}
export default StrategyContainer;