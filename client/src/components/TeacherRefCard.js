import React from "react";
import Card from 'react-bootstrap/Card';

function TeacherRefCard({key, content, strategy_id, teacher_id}) {

    return (
        <main>
            
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{strategy_id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Criteria Addressed/Assessed: </Card.Subtitle>
                  <Card.Text>{content}</Card.Text>
                  <Card.Link href="#">Update Reflection</Card.Link>
                  <Card.Link href="#">Delete Reflection</Card.Link>
              
                </Card.Body>
              </Card>
        </main>
    )
}

export default TeacherRefCard;