import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Container, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Register() {

    const { user } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault();

        fetch('https://moviecatalogsystem-api.onrender.com/users/register', {
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
            if (data.error === 'Email Invalid') {
                Swal.fire({
                    title: "Invalid Email?",
                    text: "Please check your email",
                    icon: "error"
                });
            } else if (data.error === 'Mobile number invalid') {
                Swal.fire({
                    title: "Invalid Mobile Number?",
                    text: "Please check your Mobile Number",
                    icon: "error"
                });
            } else if (data.error === 'Password must be atleast 8 characters long') {
                Swal.fire({
                    title: "Password must be atleast 8 characters long",
                    text: "Please check your password",
                    icon: "error"
                });
            } else if (data.message === 'Registered Successfully') {
                Swal.fire({
                    title: "Success",
                    text: "Registration has been successful",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    text: "Error in registration",
                    icon: "error"
                });
            }
        });
    }

    useEffect(() => {
        if ((email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, confirmPassword]);

    return (
        !user.id ?
        <Container>
            <Col xs={12} sm={10} md={8} lg={6} xl={5} className="mx-auto mt-5">
                <Card className="p-4">
                    <h1 className="text-center mb-4">Register</h1>
                    <Form onSubmit={(e) => registerUser(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.FloatingLabel controlId="floatingEmail" label="Email address">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.FloatingLabel>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!isActive}>
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Container>
        :
        <Navigate to={'/'} />
    );
}
