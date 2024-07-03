import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../context/Context';
// import SignupForm from "../components/SignupForm";
import NavBar from "../components/NavBar.js";
import TeacherProfile from "../components/TeacherProfile.js";
import TeacherReflections from "../components/TeacherReflections.js";

function TeacherPage({ user, setUser }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (!user) {
        fetch('/check-session')
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Failed to fetch teacher data.");
                }        
            })
            .then((data) => {
                setTeacher(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching teacher data:", error);
                
                    navigate('/login');
                    return;
                
            }) 
        } else {
            setLoading(false);
        }
        }, [user, setUser, navigate]);
    

    // useEffect(() => {
    //     fetch(`/teachers/${id}`)
    //         .then((resp) => {
    //             if (resp.ok) {
    //                 return resp.json();
    //             } else {
    //                 throw new Error("Failed to fetch teacher data.");
    //             }
    //         })
    //         .then((data) => {
    //             setTeacher(data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching teacher data:", error);
    //             setError(error);
    //             setLoading(false);
    //         });
    //      }, [id]);

         if (loading) {
            return <div>Loading...</div>;
         }

         if (error) {
            return <div>Error: {error.message}</div>;
         }

         if (!teacher) {
            return <div>No teacher data available.</div>;
         }
            
    return (
        <main>
            <NavBar />
            <h1>Your Teacher Page</h1>
            <div className="teacher-page-container" >
                <div className="left-div-teacherpage">
                    <TeacherReflections />
                </div>
                <div className="right-div-teacherpage">
                
                 <TeacherProfile user={user} 
                    key={teacher.id}
                    teacher={teacher}
                    />
                
                      
                </div>
            </div>  
        </main>
    )
}

export default TeacherPage;