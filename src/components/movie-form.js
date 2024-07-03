import React, {useState} from 'react';

function MovieForm(props) {

    const [title, setTitle] = useState(props.movie.title);
    const [description, setDescription]  = useState(props.movie.description);

    const updateClicked = () => {
        console.log('Upadate here');
    }


    return (
        <React.Fragment>
            { props.movie ? (
                <div>
                    {/* <h2>{props.movie && props.movie.title}</h2> */}

                    <label htmlFor='title'>Title</label><br />
                    <input id='title' type='text' placeholder='title' value={title} 
                        onChange={ evt => setTitle(evt.target.value)} /><br/>
                    
                    <label htmlFor='title'>Description</label><br />
                    <textarea id='description' type='text' placeholder='Description' value={description} 
                        onChange={ evt => setDescription(evt.target.value)}></textarea><br />
                   
                    <button onClick={ updateClicked }>Update</button>
                </div>
            ) : null }
        </React.Fragment>
    )
}

export default MovieForm;