import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import TeacherRefCard from "./TeacherRefCard.js";

function TeacherReflections() {
    const { id } = useParams();
    const { user } = useContext(AppContext);
    const [reflections, setReflections] =useState([])
   

    useEffect(() => {
        if (user && user.reflections) {
            setReflections(user.reflections);
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
                setReflections(data);
            })
            .catch(error => {
                console.error('Error fetching reflections:', error);
            });
        }
        }, [id, user]);

    // const renderRefelctions = reflections.map((reflection) => (
    //     <TeacherRefCard
    //         key={reflection.id}
    //         content={reflection.content}
    //         strategy_id={reflection.strategy_id}
    //         teacher_id={reflection.teacher_id}
    //     />
    // ));
    
    return (
        <main>
            <h1>Your Reflections</h1>
            <div>
                {reflections.map(reflection => (
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