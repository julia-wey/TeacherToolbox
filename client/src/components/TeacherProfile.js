import React, { useContext, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";

function TeacherProfile({ setUser, setTeacher }) {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({ first_name: '', last_name: '', team: '' })
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
      if (user && user.id) {
        fetchTeacherProfile(user.id);
      } 
    }, [user]);

    const fetchTeacherProfile = (userId) => {
      const endpoint = `/teachers/${user.id}`
      fetch(endpoint)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch teacher profile.');
          }
        })
        .then(data => {
          setFormValues({
            first_name: data.first_name,
            last_name: data.last_name,
            team: data.team
          });
        })
        .catch(error => {
          console.error('Error fetching teacher profile:', error);
        });
    };

    const handleProfileChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
      [ name]: value
      });
    };
    
    const handleProfileUpdate = (e) => {
      e.preventDefault();
      const endpoint = `/teachers/${user.id}`
      fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      }).then((resp) => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error('Failed to update profile.');
        }
      }).then((updatedTeacher) => {
        setTeacher(updatedTeacher);
        console.log(updatedTeacher);
        setShowModal(false);
      }).catch(error => {
        console.error('Error updating profile:', error);
    });
  };

    const handleProfileDelete = () => {
        if(!window.confirm('Are you sure you want to delete your profile?')){
          return;
        }
        const endpoint = `/teachers/${user.id}`
        fetch(endpoint, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((resp) => {
          if (resp.ok) {
            alert('Your profile has been deleted. We are sorry to see you go.')
            setUser(null)
            navigate('/')
          } else {
            alert('Invalid credentials')
          }
        }).catch(error => {
          console.error('Error deleting profile:', error);
        });
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    
    return (
        <main>
            {/* <h1>Your Teacher Profile</h1> */}
            <div className="teacher-profile">
                <h1>Profile</h1>
            
            <Card className="card" 
            style={{ width: '25rem' }} background-color="#f6f5f2">
            
                <Card.Body>
                  <Card.Title>Name: {formValues.first_name} {formValues.last_name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Team: {formValues.team}</Card.Subtitle>
                  {/* <Card.Text>
                    Is there text to add here????
                  </Card.Text> */}
                  <Button className="secondary-button" onClick={() => handleShowModal()}>Update Profile</Button>
                  <Button className="secondary-button" onClick={() => handleProfileDelete()}>Delete Profile</Button>
                </Card.Body>
              </Card>
              </div>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleProfileUpdate}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="first_name"
                        value={formValues.first_name}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={formValues.last_name}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formTeam">
                      <Form.Label>Team</Form.Label>
                      <Form.Control
                        type="text"
                        name="team"
                        value={formValues.team}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                    <Button className="button" type="submit">Update Profile</Button>
                  </Form>
                </Modal.Body>
              </Modal>
        </main>   
            );
          }


export default TeacherProfile;