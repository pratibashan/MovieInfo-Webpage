
const API_KEY = "564727fa"

$(document).ready(() => {
    $("#searchForm").on('submit',(e) => {
        let searchText=$('#searchText').val()
        // let searchQuery = 'http://www.omdbapi.com/?s='+ searchText + '&apikey='+ API_KEY
        getMovies(searchText)
        e.preventDefault()
    })
})

function getMovies(searchText) {
    
    axios.get('http://www.omdbapi.com/?s='+ searchText + '&apikey='+ API_KEY)
        .then((response) => {
            console.log(response)
            let movies = response.data.Search
            let movieItem =''
            $.each(movies,(index,movie) => {
                movieItem +=
                `<div class="col-md-3">
                    <div class ="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div> ` 
            })
            $('#movies').html(movieItem) 
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function movieSelected(id){
        sessionStorage.setItem('movieId',id)
        window.location = 'movie.html'
        return false
    }

    function getMovie() {
        let movieId = sessionStorage.getItem('movieId')

        axios.get('http://www.omdbapi.com/?i='+ movieId + '&apikey='+ API_KEY)
        .then((response) => {
            console.log(response)
            let movie = response.data
            let movieDetails=`
                <div class="row">
                    <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Released}</li>
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Rated}</li>
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Director}</li>
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Writer}</li>
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Actors}</li>
                        <li class="list-group-item"><strong>Genre: </strong>${movie.imdbRating}</li>
                    </ul>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href ="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class= "btn btn-default">Go Back TO Search</a>
                    </div>
                </div>`
                $("#movie").html(movieDetails)            
            })
            
        .catch((error) => {
            console.log(error)
        })
    }
    
     