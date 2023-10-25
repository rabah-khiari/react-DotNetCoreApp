import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { urlGenres } from "../endpoints";
import {  genreDTO } from "../movies/movies.model";
export function Indexgenres()
{
    const [cc,setcc] = useState("index cc ")
    
   console.log("index 1")
   console.log(cc)
   useEffect(()=>{
    console.log("index useEffect")
},[])
    return (<div> 
        
        <h2>Genres index</h2>

       
       <br></br>
      
       <div className="container border"> <Outlet /></div>
    </div>); 
}