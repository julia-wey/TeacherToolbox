import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import TeacherRefCard from "./TeacherRefCard.js";
import AddReflection from "./AddReflection.js";

function TeacherReflections() {
    const { id } = useParams();
    const { user } = useContext(AppContext);
    const [localReflections, setLocalReflections] =useState([])
   
    const addReflectionToList = (newReflection) => {
        setLocalReflections([...localReflections, newReflection])
    }

    useEffect(() => {
        if (user && user.reflections) {
            setLocalReflections(user.reflections);
        } else {
        fetch(`/teachers/${id}/reflections`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch reflections.');
                }
            })
            .then(data => {
                setLocalReflections(data);
            })
            .catch(error => {
                console.error('Error fetching reflections:', error);
            });
        }
        }, [id, user]);

    
    return (
        <main>
            <h1 className="heading">Your Strategy Reflections</h1>
            <h4 className="sub-heading">To add a new strategy reflection, click below.</h4>
            <AddReflection user={user} addReflectionToList={addReflectionToList} />
            
            <div>
                {localReflections.map(reflection => (
                    <TeacherRefCard 
                    key={reflection.id}
                    content={reflection.content}
                    strategy_id={reflection.strategy_id}
                    teacher_id={reflection.teacher_id}
                />
                ))}
            </div>
            
        </main>
    );
}

export default TeacherReflections;