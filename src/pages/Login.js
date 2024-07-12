import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import "./Login.css"

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    function authenticate(e) {
        e.preventDefault();
        fetch('https://moviecatalogsystem-api.onrender.com/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Login response data:", data);

            if (data.access) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to Inventory!"
                });
                navigate('/');
            } else {
                Swal.fire({
                    title: "Login Failed",
                    icon: "error",
                    text: "Invalid credentials."
                });
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            Swal.fire({
                title: "Login Failed",
                icon: "error",
                text: "An error occurred during login. Please try again."
            });
        });

        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        fetch('https://moviecatalogsystem-api.onrender.com/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("User details response data:", data);

            if (data.user) {
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                });
            } else {
                console.error("Failed to retrieve user details");
            }
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
        });
    };

    useEffect(() => {
        setIsActive(email !== "" && password !== "");
    }, [email, password]);

    useEffect(() => {
        console.log("Updated user state:", user);
    }, [user]);

    return (
        !user.id ?
        <Card className="card-container my-5">
            <h1 className="form-title">Login</h1>
            <Form onSubmit={(e) => authenticate(e)}>
                <FloatingLabel controlId="userEmail" label="Email address" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FloatingLabel>

                <FloatingLabel controlId="password" label="Password" className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FloatingLabel>

                {
                    isActive ?
                    <Button variant="primary" type="submit" id="submitBtn">
                        Submit
                    </Button>
                    :
                    <Button variant="danger" type="submit" id="submitBtn" disabled>
                        Submit
                    </Button>
                }
            </Form>
        </Card>
        :
        <Navigate to={'/'} />
    )
}
