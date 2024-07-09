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
        <div>
            <Card className="strat-cards">
                <Card.Body>
                  <Card.Title className="strat-name">Strategy Name: {strategy.name} </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Criteria Addressed/Assessed: </Card.Subtitle>
                  <Card.Text className="strat-description">Description: {strategy.description} </Card.Text>
                  <Card.Text className="strat-instructions">Instructions: {strategy.instructions} </Card.Text>
                  <Button className="secondary-button" onClick={handleShowReflections}>See Reflections</Button>
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
                    <Button className="secondary-button" onClick={handleCloseReflections}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default StrategyCard;