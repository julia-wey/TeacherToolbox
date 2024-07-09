import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function TeacherRefCard({ content, strategy_name, handleShowUpdateModal, handleDeleteReflection }) {

    return (
        <div>
            
            <Card className="ref-cards" >
                <Card.Body>
                  <Card.Title>{strategy_name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Criteria Addressed/Assessed: </Card.Subtitle>
                  <Card.Text>{content}</Card.Text>
                  <Button className="secondary-button"
                  onClick={handleShowUpdateModal}>
                      Update Reflection
                  </Button>
                  <Button className="secondary-button" 
                      onClick={handleDeleteReflection}>
                      Delete Reflection
                  </Button>
                </Card.Body>
              </Card>
        </div>
    )
}

export default TeacherRefCard;