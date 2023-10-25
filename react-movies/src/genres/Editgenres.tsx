import React,{ useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import {  TokenConx, urlGenres } from "../endpoints";
import axios from "axios";
import { genreDTO } from "../movies/movies.model";

export function Editgenres(){
    const navigate= useNavigate();
    const param = useParams();
    const [name,setName]=useState(""); 
    const [errors,setErrors]=useState(""); 
    const [genre,setGenre] =  useState<genreDTO>();
    let url="/"+param.id
    useEffect(()=>{
    axios.get(urlGenres+url,TokenConx())
    .then((resp) =>{  console.log("edit:"); 
            setGenre(resp.data)
            setName(resp.data.name)
         } )
    },[param.id])

    function handleSubmit(e:any) {
        e.preventDefault();
        let newGenre={
            name:name,
            id : param.id
        }
           
    axios.patch( `${urlGenres}?id=`+param.id,newGenre,TokenConx())
        .then((data)=>{
            navigate('/genres');
        } )
        .catch(
            function (error) {
            console.log('Show error notification!')
            setErrors(error.response.data.errors.Name[0])
            console.log(error)
            }
        )
    
        console.log(newGenre);
      }

    return (<>
        <h1>Edit Genres the id is {param.id}</h1>
        <form onSubmit={handleSubmit}>
            <label >Name:</label>
            <input type="text" className="form-control mt-3" value={name} onChange={(e)=>setName(e.target.value)} name="name" ></input>
            <div className="container bg-danger text-white " role="alert">
                     {errors}
            </div>
            <button className="btn btn-primary" type="submit"> Update </button>
        </form>

        <button className="btn btn-primary" onClick={()=>{
            navigate('/genres');
        }} > reteur</button>
    </>);
}