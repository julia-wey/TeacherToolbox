import React, { useEffect, useState } from "react";

function Reflections({ strategyId }) {
    const [reflections, setReflections] = useState([]);

    useEffect(() => {
        fetch(`/strategies/${strategyId}/reflections`)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                throw Error('Network response was not ok.')
            })
            .then((reflectionsData) => setReflections(reflectionsData));
    }, [strategyId])

    return (
        <div>
            <h4>Reflections</h4>
            {reflections.length > 0 ? (
                <ul>
                    {reflections.map((reflection) => (
                        <li key={reflection.id}>{reflection.content}</li>
                    ))}
                </ul>
            ) : (
                <p>No reflections available.</p>
            )}
        </div>
    );
}

export default Reflections;