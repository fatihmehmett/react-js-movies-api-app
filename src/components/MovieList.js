import React from "react";

const MovieList = (props) => {
    

        // function HandleClick(e){//e parametresi tıklama olayı gerçekleşince hangi componentte olduğunu reactin anlamsına yarıyor 3 tane var o an hangisinde mesela öyle
        //     console.log(e.pageX)
        // }




        //film açıklması belli karakter sayısında olması için fonksiyon:

        const truncateOverview=(string,maxLength)=>{
            if(!string) return null;
            if(string.length <= maxLength) return string;
            return `${string.substring(0,maxLength)} ...`
        }






        return (

            <div className="row">

                {props.movies.map((movie) => (

                    <div className="col-lg-4" key={movie.id}>
                        <div className="card mb-4 shadow-sm">
                            <img src={movie.imageURL} className="card-img-top" alt="Sample Movie" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">{truncateOverview(movie.overview,30)}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="button" onClick={(e)=>props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>
                                    <h2><span className="badge bg-info">{movie.rating}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


            </div>


        )
    
}

export default MovieList;