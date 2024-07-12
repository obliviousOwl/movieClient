import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UpdateMovie({ movie, fetchData }) {

    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');


    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (product) => {

        fetch(`https://moviecatalogsystem-api.onrender.com/movies/getMovie/${movie}`)
            .then(res => res.json())
            .then(data => {

                setTitle(data.title);
                setDirector(data.director);
                setYear(data.year);
                setGenre(data.genre)
                setDescription(data.description);;
            })

        setShowEdit(true);
    }

    const closeEdit = () => {

        setShowEdit(false);

        setTitle('');
        setDirector('');
        setYear('');
        setGenre('')
        setDescription('');;
    }

    const editMovie = (e, product) => {

        e.preventDefault();

        fetch(`https://moviecatalogsystem-api.onrender.com/movies/updateMovie/${movie}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title,
                director,
                year,
                genre,
                description
            })
        })
            .then(res => res.json())
            .then(data => {

                if (data.message === 'Movie updated successfully') {

                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Product Successfully Updated'
                    })

                    closeEdit();
                    fetchData();

                } else {

                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        text: 'Please try again'
                    })

                    closeEdit();
                    fetchData();
                }
            })
    }

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => openEdit(movie)}>
                Edit
            </Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={(e) => editMovie(e, movie)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                                type="text"
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>year</Form.Label>
                            <Form.Control
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => closeEdit()}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}