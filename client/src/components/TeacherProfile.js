import React, { useContext } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";

function TeacherProfile({user, teacher}) {
    const {first_name, last_name, team} = teacher
    const navigate = useNavigate;
    
    return (
        <main>
            <h1>Your Teacher Profile</h1>
            <div className="teacher-profile">
                <h1>hello</h1>
            
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Name: {first_name} {last_name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Team: {team}</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Card.Link href="#">Update Profile</Card.Link>
                  <Card.Link href="#">Delete Profile</Card.Link>
                </Card.Body>
              </Card>
              </div>
        </main>   
            );
          }


export default TeacherProfile;