import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import axios from 'axios';



class App extends React.Component {
    

    state={
        movies:[],
        
        searchQuery: ""
        
    }

    // async componentDidMount(){
    //     const baseURL="http://localhost:3002/movies";
    //     const response = await fetch(baseURL);//network sorguları yapmaya yarayan fetch methodu kullanıdk bize geriye promise döndürdü.GET metodu yaptık
    //     console.log(response);//promise değer getirdi
    //     const data= await response.json();//Verileri kullanmak için jsona dönüştürmemeiz gerek. Promise değeri direkt jsona dönüştüremedik sebebi ise asenkron olmamasıydı. Asenkron yapmak için await geitrdik ve didmounth metunuda async diyerek asenkron yaptık ve artık döüştürdük veriler dizi olarak geldi.Artık verileri state e atabiliriz.
    //     console.log(data)//json değer getirdi dizi şeklinde
    //     this.setState({movies:data})//setState ile state e attık ve veriler artık ekranda göründü.Veri çekme işlemi başarılı :)
    // }
    // verileri getirme işlemlerini axios ile yapmayı deneyelim birde

    async componentDidMount(){
        const response= await axios.get("http://localhost:3002/movies"); //aynı işlemleri yapıyor fakat axios ile yapınca direkt obje içerisinde datasında veriler geliyor. Yani json dönüştrümeye gerek kalmıyor.
        //console.log(response);
        this.setState({movies: response.data})
    }

    //sayfayaı yenileyince sildiklerimiz geri geliyordu. Artık bunu direkt json verilerinden silmek için fetch ve axios ile iki farklı şekilde silme işlemlerini yapalım.Eski hali aşağıdaki gibidir.
    // deleteMovie =(movie)=>{
    //     const newMovieList= this.state.movies.filter(
    //         m => m.id !== movie.id
    //     );

    //     this.setState(state =>({
    //         movies:newMovieList
    //     }))
    // }

    //FETCH API DELETE
    // deleteMovie= async (movie)=>{
    //     const baseURL=`http://localhost:3002/movies/${movie.id}`;
    //     await fetch(baseURL,{//DELETE methodu ile veriyi silmesini söylüyoruz. artık sayfayı yenileyince gelmiycek veri.Çünkü json soyasından sildik ve verilerimiz json dosyasından çekiliyordu olmadığı için gelmiycek.
    //         method:"DELETE"
    //     })
    //     const newMovieList= this.state.movies.filter(
    //         m => m.id !== movie.id
    //     );

    //     this.setState(state =>({
    //         movies:newMovieList
    //     }))
    // }

    // AXIOS API DELETE
    deleteMovie= async (movie)=>{
        axios.delete(`http://localhost:3002/movies/${movie.id}`)
        const newMovieList= this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state =>({
            movies:newMovieList
        }))
    }

    addMovie= async (movie)=> {
        await axios.post('http://localhost:3002/movies/',movie)
        this.setState(state =>({
            movies: state.movies.concat([movie])
        }))
    }

    searchMovie=(event)=>{
        //console.log(e.target.value)
        this.setState({searchQuery: event.target.value})
    }


    
    render(){

        let filteredMovies= this.state.movies.filter(
            (movie)=>{
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        )

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar 
                        searchMovieProp={this.searchMovie}/>
                    </div>
                </div>
                <MovieList
                 movies={filteredMovies}
                 deleteMovieProp={this.deleteMovie}

                 />
                 <AddMovie 
                    onAddMovie={(movie)=>{this.addMovie(movie)}}
                 />
            </div>
        )

    }
}

export default App;