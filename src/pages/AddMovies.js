import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AddMovie() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (title !== '' && director !== '') {
      setIsActive(true)
    }
    else {
      setIsActive(false)
    }
  }, [title, director, year, genre, description])

  const addWorkout = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');

    try {
      const response = await fetch('https://moviecatalogsystem-api.onrender.com/movies/addMovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          director,
          year,
          description,
          genre
        })
      });
      const data = await response.json();
      if(data.error === 'Movie already exists'){
        Swal.fire({
          title: 'Movie already exists',
          icon: 'error',
          text: 'This movie already exists'
        });
      }
      else if(data !== null) {
        Swal.fire({
          title: 'Movie successfully added',
          icon: 'success'
        })
        navigate('/movies')
      }
    }
    catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error in saving the product',
        icon: 'error',
        text: 'Error in saving the product'
      });
    }
  }

  return (
    <>
      <h1 className="text-center pt-5">Add Movie</h1>
      {
        !user.id ?
          <Navigate to='/login' />
          :
          <Form onSubmit={e => addWorkout(e)}>
            <FloatingLabel controlId="floatingName" label="Title" className="my-3">
              <Form.Control type="text" placeholder="Title" required value={title} onChange={e => { setTitle(e.target.value) }} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingDescription" label="Director" className="my-3">
              <Form.Control type="text" placeholder="Director" required value={director} onChange={e => { setDirector(e.target.value) }} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingName" label="Year" className="my-3">
              <Form.Control type="text" placeholder="Year" required value={year} onChange={e => { setYear(e.target.value) }} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingName" label="Genre" className="my-3">
              <Form.Control type="text" placeholder="Genre" required value={genre} onChange={e => { setGenre(e.target.value) }} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingName" label="Description" className="my-3">
              <Form.Control type="text" placeholder="Description" required value={description} onChange={e => { setDescription(e.target.value) }} />
            </FloatingLabel>

            {
              isActive ?
                <Button variant="primary" type="submit" id="submitBtn" className='my-2'>Submit</Button>
                :
                <Button variant="danger" type="submit" id="submitBtn" className='my-2' disabled>Submit</Button>
            }
          </Form>
      }
    </>
  )
}
