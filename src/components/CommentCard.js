import { Card } from "react-bootstrap";

export default function CommentCard({ commentProp }) {
    const { comment, userId } = commentProp;

    return (
        <Card className="my-3">
            <Card.Body className="text-center">
                <Card.Title><h2>"{comment}"</h2></Card.Title>
                <Card.Subtitle>By: User{userId}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}