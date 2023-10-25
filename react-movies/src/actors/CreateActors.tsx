import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenConx, urlActors, urlGenres } from "../endpoints";

export function CreatActors(){

    const [file,setFile]=useState(new FormData());
    const [name,setName]=useState("");
    const [image,setimage]=useState("");
    const [Bibiography,setBibiography]=useState("");
    const [date,setDate]=useState(new Date()) 
    const navigate= useNavigate();
    const [errors,setErrors]=useState(""); 
    
    const handleFileUpload = (event: any) => {
    
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        setFile(formData)
    }
    function handleSubmit(e:any) {
        e.preventDefault();
        
        let Actor= {
            name : "",
            DateOfBirth : new Date(),
            Biography : "",
            Picture :""
        }

        Actor.name=name
        Actor.DateOfBirth=date
        Actor.Biography=Bibiography
        Actor.Picture="pic.jpg";
        // UploadFile
        axios.post(urlActors+"/UploadFile", file, {
            headers: {
            "Content-Type": "multipart/form-data",
            "x-rapidapi-host": "https://localhost:7172/WeatherForecast"
            },
                })
            .then((response) => {
                console.log(response);
                
                Actor.Picture=response.data
                    //upload the actor 
                        axios.post(urlActors,Actor,TokenConx())
                        .then((rep)=>{  
                            
                            console.log(rep) ;navigate('/actors') } 
                             )
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
  
   
    return (<>

        <h2>Creat Actors {date.toString()}</h2>
        <form onSubmit={handleSubmit}>
            <label >Name:</label>
            <input type="text" className="form-control mt-3" value={name} onChange={(e)=>setName(e.target.value)} ></input>
            <label >Bibiography:</label>
            <input type="text" className="form-control mt-3" value={Bibiography} onChange={(e)=>setBibiography(e.target.value)} ></input>
            <div className="col form-check">
                <label>Date:</label>
                <input type="date"  onChange={(e)=>setDate(new Date(e.target.value))}></input>
            </div>
            <label >Pictur:</label>
            <input type="file" className="form-control mt-3" onChange={handleFileUpload} ></input>
            
            <div className="container bg-danger text-white " role="alert">
                     {errors}
            </div>
            <button className="btn btn-primary"> create </button>
        </form>
    </>);
}

interface actorCreateDTO{
    name: string;
    dateBirth:Date;
}