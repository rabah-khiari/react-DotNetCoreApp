import { Link, Navigate, useNavigate } from "react-router-dom";
import { genreDTO } from "./movies.model";
import { useEffect, useState } from "react";
import axios from "axios";
import { TokenConx, urlMovie, urlGenres } from "../endpoints";

export function CreateMovies(){
     
    const handleFileUpload = (event: any) => {
    
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        setFile(formData)
    }

    function handleSubmit(e:any) {
       
        e.preventDefault();
        console.log("title "+title+" tarailer"+trailer+" "+inThet+" "+date+" "+genreId)

        let Movie= {
            title : "",
            releasDate : new Date(),
            description : "",
            image :"",
            genreId:0,
            trailer:""
        }

        Movie.title=title
        Movie.releasDate=date
        Movie.description=description
        Movie.image="pic.jpg";
        Movie.genreId=genreId;
        Movie.trailer="https://www.youtube.com/embed/tgbNymZ7vqY"
        // UploadFile
        axios.post(urlMovie+"/UploadFile", file, {
            headers: {
            "Content-Type": "multipart/form-data",
            "x-rapidapi-host": "https://localhost:7172/WeatherForecast"
            },
                })
            .then((response) => {
                console.log(response);
                
                Movie.image=response.data
                    //upload the actor 
                        axios.post(urlMovie,Movie,TokenConx())
                        .then((rep)=>{  
                            
                            console.log(rep) ;
                            navigate('/movies') ;
                            })
                        .catch(
                            function (error) {
                            console.log('Show error notification!')
                            //setErrors(error.response.data.errors.Name[0])
                            console.log(error)
                            }
                        )
                })
                .catch((error) => {
                    console.log("erreur f upload image ");
                    console.log(error);

                });
      }
    const [file,setFile]=useState(new FormData());
    const [title,setTitle]=useState("");
    const [trailer,setTrailer]=useState("");
    const [description,setDescription]=useState("");
    const [genreId,setGenreId]=useState(0);
    const [inThet,setinThet]=useState(false);
    const [date,setDate]=useState(new Date()) ;
    const [genres,setGenres] =  useState<genreDTO[]>([]);
    const navigate= useNavigate();
    
    useEffect(()=>{

        let url='/GetAll?page=0';
        axios.get(urlGenres+url,TokenConx())
            .then((resp) =>{ setGenres(resp.data) })
        console.log("movie 1")
    },[])
    return (<>
        <h2>Creat Movies</h2>
        <form className="container" onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
                <label className="form-label">Title:</label>
                <input type="text" className="form-control" value={title} 
                onChange={(e)=>{setTitle(e.target.value) }}></input>
            </div>
            <div className="mb-3 mt-3">
                <label className="form-label">trailer:</label>
                <input type="text" className="form-control" value={trailer} 
                onChange={(e)=>{setTrailer(e.target.value) }}></input>
            </div>
            <div className="mb-3 mt-3">
                <label className="form-label">Description:</label>
                <input type="text" className="form-control" value={description} 
                onChange={(e)=>{setDescription(e.target.value) }}></input>
            </div>
            
            
            <div className="form-check mb-3">
                <label className="form-check-label">
                <input className="form-check-input" type="checkbox" checked={inThet}  onChange={(e)=>{setinThet(e.target.checked)}}></input>
                in Theaters
            </label>
            </div>
            <div className="col form-check">
                <label>Release Date:</label>
                <input type="date"  onChange={(e)=>setDate(new Date(e.target.value))}></input>
            </div>
            <label  className="form-label">Select list (select one):</label>
            <select className="form-select"value={genreId} onChange={(e)=>{setGenreId(Number(e.target.value)) }} >
                    <option value={0}>---genre---</option>
                {
                    genres?.map(item=><option value={item.id}>{item.name}</option>)
                }

            </select>
            <label >Pictur:</label>
            <input type="file" className="form-control mt-3" onChange={handleFileUpload} ></input>
            <button type="submit" className="btn btn-primary">Submit</button>
            
        </form>
    </>);
}