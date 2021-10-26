import React from "react";

class SearcBar extends React.Component {

    
    

    handleFormSubmit=(event)=>{
        event.preventDefault();
    }





    render(){

        return(

            <form onSubmit={this.handleFormSubmit}>
                <div className="form-row my-5 d-flex">
                    <div className="col-10">
                        <input onChange={this.props.searchMovieProp}  type="text" className="form-control" placeholder="Search a Movie and Press Enter" />
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-md btn-danger" style={{float:"right"}} >Add Movie</button>
                    </div>
                </div>
            </form>


        )
    }
}

export default SearcBar;