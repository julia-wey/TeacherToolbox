import React, { useState, useContext, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AppContext } from "../context/Context";

function AddReflection({ user, addReflectionToList }) {
    const { user: contextUser } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [content, setContent] = useState('');
    const [strategyId, setStrategyId] = useState(`''`);
    const [strategies, setStrategies] = useState([]);
    
    useEffect(() => {
        fetch('/strategies')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch strategies.')
                }
            })
            .then(data => {
                setStrategies(data);
            })
            .catch(error => {
                console.error('Error fetching strategies:', error);
            });
    }, []);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    const handleSubmit = () => {
        const newReflection = {
            content, 
            strategy_id: strategyId,
            teacher_id: contextUser.id
        };

        fetch('/reflections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReflection)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Reflection added:", data)
            addReflectionToList(data);
            handleClose();
        })
        .catch(error => {
            console.error("Error adding reflection:", error);
        });
    };

    if (!contextUser || !contextUser.id) {
        return <div>Loading...</div>;
    }


    return (
        <div className="add-ref-div">
            <Button className="button" onClick={handleShow}>
                Add Reflection 
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Reflection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="strategtId">
                            <Form.Label>Strategy</Form.Label>
                            <Form.Control
                                as="select"
                                value={strategyId}
                                onChange={(e) => setStrategyId(e.target.value)}
                            >
                                <option value=''>Select a strategy</option>
                                {strategies.map(strategy => (
                                    <option key={strategy.id} value={strategy.id}>
                                        {strategy.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="reflectionContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter reflection"
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="secondary-button" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="secondary-button" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddReflection;