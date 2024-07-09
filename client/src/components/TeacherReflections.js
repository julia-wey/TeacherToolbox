import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import TeacherRefCard from "./TeacherRefCard.js";
import AddReflection from "./AddReflection.js";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function TeacherReflections() {
    const { id } = useParams();
    const { user } = useContext(AppContext);
    const [localReflections, setLocalReflections] =useState([])
    const [selectedReflection, setSelectedReflection] = useState(null);
    const [formValues, setFormValues] = useState({ strategy_id: '', content: '' })
    const [showModal, setShowModal] = useState(false);

    const addReflectionToList = (newReflection) => {
        setLocalReflections([...localReflections, newReflection])
    }

    useEffect(() => {
        const fetchReflections = async () => {
            try {
                if (user && user.reflections) {
                    const reflectionsWithNames = user.reflections.map(reflection => ({
                        ...reflection,
                        strategy_name: reflection.strategy ? reflection.strategy.name : 'Unknown'
                    }));
                    setLocalReflections(reflectionsWithNames);
                } else {
                    const response = await fetch(`/teachers/${id}/reflections`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch reflections.');
                    }
                    const data = await response.json();
                    const reflectionsWithNames = data.map(reflection => ({
                        ...reflection,
                        strategy_name: reflection.strategy ? reflection.strategy.name : 'Unknown'
                }));
                setLocalReflections(reflectionsWithNames);
            }
        } catch (error) {
            console.error('Error fetching reflections:', error);
        }
    };
    fetchReflections();
    }, [id, user]);


        const handleShowUpdateModal = (reflection) => {
            setSelectedReflection(reflection);
            setFormValues(reflection);
            setShowModal(true);
        };

        const handleCloseModal = () => {
            setSelectedReflection(null);
            setShowModal(false);
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormValues({...formValues, [name]: value });
        };

        const handleReflectionUpdate = (e) => {
            e.preventDefault();
            const endpoint = `/reflections/${formValues.id}`
            fetch(endpoint, {
                method:'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            }).then((resp) => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error('Failed to update reflection.');
                }
            }).then((updatedReflection) => {
                const updatedReflections = localReflections.map(reflection =>
                    reflection.id === updatedReflection.id ? updatedReflection : reflection
                );
                setLocalReflections(updatedReflections);
                handleCloseModal();
            }).catch(error => {
                console.error('Error updating reflection:', error);
            });
        };

    const handleDeleteReflection = (reflectionId) => {
        if(!window.confirm('Are you sure you want to delete this reflection?')){
            return;
        }
        const endpoint = `/reflections/${reflectionId}`;
        fetch(endpoint, {
            method: 'DELETE',
        }).then((resp) => {
            if (resp.ok) {
                const updatedReflections = localReflections.filter(reflection => reflection.id !== reflectionId);
                setLocalReflections(updatedReflections);
            } else {
                throw new Error('Failed to delete reflection.');
            }
        }).catch(error => {
            console.error('Error deleting reflection:', error);
        });
    };

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
                    strategy_name={reflection.strategy_name}
                    teacher_id={reflection.teacher_id}
                    handleShowUpdateModal={() => handleShowUpdateModal(reflection)}
                    handleDeleteReflection={() => handleDeleteReflection(reflection.id)}
                />
                ))}
            </div>

            {selectedReflection && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Reflection</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleReflectionUpdate}>
                            <Form.Group controlId='strategy_name'>
                                <Form.Label>Strategy Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="strategy_name"
                                    value={selectedReflection.strategy_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId='content'>
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    name="content"
                                    value={formValues.content}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button className="button" type="submit">
                                Update Reflection
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
            
        </main>
    );
}

export default TeacherReflections;