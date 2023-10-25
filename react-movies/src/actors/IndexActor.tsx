import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { urlActors } from "../endpoints";
import axios from "axios";

export function IndexActors(){

    const [Actors,setActors] =  useState<ActorDTO[]>([]);
   
    const pageNbr=[1,2,3]

    function handlPagin(pageIndex:number){
        let url='/GetAll?page='+pageIndex;
        axios.get(urlActors+url)
        .then((resp) =>{ setActors(resp.data) } )
    }

    let url='/GetAll?page=1';
    useEffect(()=>{
    axios.get(urlActors+url)
    .then((resp) =>{ setActors(resp.data) } )
    },[])
    function DeleteGenre(id:number)
    { 

        axios.delete(`${urlActors}?id=`+id).then((data)=>console.log(data))
        console.log(id)
    }
    return (<>
        <h1>Actors</h1>
        <Link className="btn btn-primary m-2 " to="/actors/create">Create Actors</Link>
        <br></br>

       <div className="container border"> <Outlet /></div>
    </>);
}

export interface ActorDTO{
    id:number;
    name : string,
    dateOfBirth :Date,
    biography :string,
    picture : string
}