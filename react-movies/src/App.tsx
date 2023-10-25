import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Indivmovies } from './movies/Indivmovies';
import { landingPageDTO, movieDTO, movieDTO2 } from './movies/movies.model';
import { MoviesList } from './movies/Movies.list';
import { Menu } from './Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Indexgenres } from './genres/Indexgenres';
import { Creatgenres } from './genres/Creatgenres';
import { Editgenres } from './genres/Editgenres';
import { IndexActors } from './actors/IndexActor';
import { EditActors } from './actors/EditActors';
import { CreatActors } from './actors/CreateActors';
import { IndexTheaters } from './Theaters/IndexTheaters';
import { EditTheaters } from './Theaters/EditTheaters';
import { CreatTheaters } from './Theaters/CreateTheaters';
import { FilterMovies } from './movies/FilterMovies';
import { EditeMovies } from './movies/EditeMovies';
import { CreateMovies } from './movies/CreateMovies';
import { Movies } from './movies/Movies';
import { ShowActors } from './actors/ShowActors';
import { MemoShowGenres } from './genres/ShowGenres';
import { CreatUser } from './Auth/CreateUser';
import { LoginUser } from './Auth/LoginUser';
import { HomeConst } from './construction/HomeConst';
import axios from 'axios';
import { urlMovie } from './endpoints';


function Valx()
{
  const [movie,setMovie]=useState([]);
  useEffect(()=>{
    let url='/GetAll?page=1';
  
        axios.get(urlMovie+url)
        .then((resp) =>{ setMovie(c =>resp.data);console.log(movie) } )
  
},[])
  const [movies,setMovies]= useState<landingPageDTO>({});
  useEffect(()=> {
    const timerId= setTimeout(()=>{
      setMovies({
          inTheaters:[
          {id:1,
          title:"Bull Sharl Bandits ",
          poster:"./assets/img/films/a.jpg"},
          {id:2,
          title:"joan Crawford",
          poster:"./assets/img/films/b.jpg"},
          {id:3,
          title:"Billion dollar  ",
          poster:"./assets/img/films/e.jpg"},    
          {id:4,
          title:"boy in the walls",
          poster:"./assets/img/films/c.jpg"},
          {id:5,
          title:"the scarlet ",
          poster:"./assets/img/films/i.jpg"},
          {id:6,
          title:"snipes",
          poster:"./assets/img/films/n.jpg"},
          {id:7,
          title:"monster boy",
          poster:"./assets/img/films/o.jpg"},
          {id:8,
          title:"jules",
          poster:"./assets/img/films/p.jpg"},
          {id:9,
          title:"Darbar",
          poster:"./assets/img/films/r.jpg"},
          {id:10,
          title:"Rob Shneider woke up in us",
          poster:"./assets/img/films/t.jpg"},
          {id:11,
          title:"momy's stolen memories",
          poster:"./assets/img/films/u.jpg"},
          {id:12,
          title:"shin yun",
          poster:"./assets/img/films/v.jpg"}
          ],
          upcoming:[
            {id:1,
            title:"interstiler ",
            poster:"./assets/img/films/breadcrumbs-bg.jpg"}
            ]
         })
    },500);
    return () => clearTimeout(timerId);

  },[]);
  
  const [x,setx]=useState(new Date())
   
 // setInterval(()=>{setx(new Date())},1000)

  return(
<>    
       <div className='appDiv'> 
        
          <h6>  {x.toString()} </h6>
          <h2> In Theaters </h2>

          <MoviesList movies={movie}/>
          <h2>Upcoming releases </h2>
         

      </div>
      </> 
 );

}
function App() {
  
  return (
    <div className="App">
       
      <BrowserRouter>
      <Menu></Menu>
      <Routes >
        <Route path="/" element={Valx()} />

        <Route path="/genres" element={<Indexgenres />} >
          <Route path="/genres" element={<MemoShowGenres />} />
          <Route path="/genres/create" element={<Creatgenres />} />
          <Route path="/genres/edite/:id" element={<Editgenres />} />
        </Route>
        
        <Route path="/actors" element={<IndexActors />} >
          <Route path="/actors" element={<ShowActors />} />
          <Route path="/actors/edite" element={<EditActors />} />
          <Route path="/actors/create" element={<CreatActors />} />
        </Route>
        <Route path="/theaters" element={<IndexTheaters />} >
          <Route path="/theaters/edite" element={<EditTheaters />} />
          <Route path="/theaters/create" element={<CreatTheaters />} />
        </Route>
        <Route path="/movies" element={<Movies />} >
          <Route path="/movies/edite" element={<EditeMovies />} />
          <Route path="/movies/create" element={<CreateMovies />} />
          <Route path="/movies/filter" element={<FilterMovies />} />
        </Route>
        <Route path="/user" element={<CreatUser />} />
        <Route path="/construction" element={<HomeConst />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="*" element={<h2>page not found </h2>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
