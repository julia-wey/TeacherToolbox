import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Reflections from "./Reflections";

function StrategyCard({strategy}) {
    const [showReflections, setShowReflections] = useState(false);

    const handleShowReflections = () => setShowReflections(true);
    const handleCloseReflections = () => setShowReflections(false);
    
    return (
        <main>
            <h3>This is the strategy Card</h3>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Strategy Name: {strategy.name} </Card.Title>
                  <Card.Text>Description: {strategy.description} </Card.Text>
                  <Card.Text>Instructions: {strategy.instructions} </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Criteria Addressed/Assessed: </Card.Subtitle>
                  <Card.Link onClick={handleShowReflections}>See Reflections</Card.Link>
                </Card.Body>
            </Card>

            <Modal show={showReflections} onHide={handleCloseReflections}>
                <Modal.Header closeButton>
                    <Modal.Title>Reflections</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Reflections strategyId={strategy.id} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseReflections}>Close</Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}

export default StrategyCard;