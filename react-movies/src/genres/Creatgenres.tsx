import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  TokenConx, urlGenres } from "../endpoints";
export function Creatgenres(){
    const [name,setName]=useState("");
    const navigate= useNavigate();
    const [errors,setErrors]=useState(""); 
    
    function handleSubmit(e:any) {
        e.preventDefault();
        
        let genre= {
            name : ""
        }
        console.log(genre.name);
        
        genre.name=name
        
            axios.post(urlGenres,genre,TokenConx())
            .then((rep)=>{  
            navigate('/genres');
                console.log(rep) }  )
            .catch(
                function (error) {
                  console.log('Show error notification!')
                  setErrors(error.response.data.errors.Name[0])
                  console.log(error)
                }
              )
           
      }

    console.log(name)
    return (<>
        <h2>Creat Genres</h2>
        <form onSubmit={handleSubmit}>
            <label >Name:</label>
            <input type="text"  className="form-control mt-3" value={name} onChange={(e)=>setName(e.target.value)} name="name" ></input>
            <div className="container bg-danger text-white " role="alert">
                     {errors}
            </div>
            <button className="btn btn-primary"> create </button>
           
        </form>
       
        
        
    </>);
}