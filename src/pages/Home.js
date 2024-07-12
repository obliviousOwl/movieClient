import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {

	return (
		<>
        <Row>
            <Col className="p-4 text-center">
                <h1>Welcome to Movies Vault</h1>
                <p>Browse Movies and leave reviews</p>
                <Link className="btn btn-primary" to={'/movies'}>Movies</Link>
            </Col>
        </Row>
		</>
	)
}