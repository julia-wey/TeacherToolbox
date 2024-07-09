import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function TeacherRefCard({key, content, strategy_id, teacher_id}) {

    return (
        <div>
            
            <Card className="ref-cards" >
                <Card.Body>
                  <Card.Title>{strategy_id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Criteria Addressed/Assessed: </Card.Subtitle>
                  <Card.Text>{content}</Card.Text>
                  <Button className="secondary-button" href="#">Update Reflection</Button>
                  <Button className="secondary-button" href="#">Delete Reflection</Button>
                </Card.Body>
              </Card>
        </div>
    )
}

export default TeacherRefCard;