import { useState, useEffect, useContext } from "react";
import UserView from '../components/UserView';  
import UserContext from '../UserContext';
import AdminView from "../components/AdminView";
import { Container } from "react-bootstrap";

export default function Movies() {

    const { user } = useContext(UserContext);

    const [ movies, setMovies ] = useState([]);

    const [ loading, setLoading ] = useState(true);

	const fetchData = () => {

		fetch(`https://moviecatalogsystem-api.onrender.com/movies/getMovies`)
		.then(res => res.json())
		.then(data => {
            console.log(data);
			if(typeof data.products !== 'string') {
				setMovies(data.movies);
                setLoading(false);
			} else {
				setMovies([]);
                setLoading(false);
			}
		})
	}

	useEffect(() => {
		fetch('https://moviecatalogsystem-api.onrender.com/movies/getMovies')
		.then(res => res.json())
		.then(data => {
			setMovies(data.movies)
            setLoading(false);
		})
	})

    if (loading) return <div>Loading...</div>;

    return (
		<Container>
			<h1 className="text-center">Movies</h1>
			
		{
			user.isAdmin ?
			<AdminView movieData={movies} fetchData={fetchData} />
			:
			<UserView movieData={movies} />
		}
		</Container>
    )

}