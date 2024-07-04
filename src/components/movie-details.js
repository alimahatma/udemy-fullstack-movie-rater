import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function MovieDetails(props) {

    const [highlighted, setHighlighted] = useState(-1);
    
    let mov = props.movie;

    const hightLightRate = high => evt => {
        setHighlighted(high);
    }

    const rateClicked = rate => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 4e10a5822145ebc55cdf800741f0479b10a16d1c'
            },
            body: JSON.stringify({stars: rate + 1})
        })

        .then( () => getDetails()) //! mendapatkan menu details
        .catch( error => console.log(error))    
    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 4e10a5822145ebc55cdf800741f0479b10a16d1c'
            }
        })
        .then( resp => resp.json())
        .then( resp => props.updateMovie(resp))
        .catch( error => console.log(error))
    }

    return (

        <React.Fragment>
            { mov ? (
                <div>
                    <h1>{mov.title}</h1>
                    <p>{mov.description}</p>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? "orange":''} />
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? "orange":''} />
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? "orange":''} />
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? "orange":''} />
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? "orange":''} />
                    ({ mov.no_of_ratings })

                    <div className='rate-container'>
                        <h2>Rate it</h2>
                        { [...Array(5)].map( (e, i) => {
                            return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i - 1 ? 'purple':''}
                                onMouseEnter={hightLightRate(i)}
                                onMouseLeave={hightLightRate(-1)}
                                onClick={rateClicked(i)}
                            />
                        })}
                    </div>

                    </div>
            ): null}
        </React.Fragment>
    )
}


export default MovieDetails;