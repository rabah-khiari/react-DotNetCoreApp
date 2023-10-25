import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  TokenConx, urlGenres } from "../endpoints";
import {  genreDTO } from "../movies/movies.model";
import { Pagination } from "./Pagination";
import { wait } from "@testing-library/user-event/dist/utils";
export function ShowGenres()
{
    console.log("cxcccc")
    let pageTableTemp=[{indx:1,active:"active"}]
    const [genres,setGenres] =  useState<genreDTO[]>([]);
    const [numbPage,setNumbPage] =  useState(1);
    const [pageTable,setpageTable] =  useState(pageTableTemp);
    const [CurrentPage,setCurrentPage] =  useState(1);

  
    

    function GetnbPage(){
        let urlnbpage='/GetNumbPage';
        axios.get(urlGenres+urlnbpage)
        .then(resp => { 
            setNumbPage(c=> resp.data)
            for(let i=2;i<=resp.data;i++)
            {
            pageTableTemp.push({indx:i,active:""});
            }
        })
        return pageTableTemp;
   }

    useEffect(()=>{
        let url='/GetAll?page=1';
        console.log("pageTable") 
        console.log(pageTable) 
        setpageTable(c => GetnbPage())
        if(localStorage.getItem("token")!==null)
        {   
            axios.get(urlGenres+url,TokenConx())
            .then((resp) =>{ setGenres(resp.data) } )
        }
    
    },[])

    if(localStorage.getItem("token")==null)
    { 
        return ( <>
        <div><h1>You Are not connected</h1></div>
       </>);
    }
    function handlPagin(pageIndex:number){
        setCurrentPage(pageIndex)
        let url='/GetAll?page='+pageIndex;
        for(let i=2;i<=numbPage;i++)
        {
            pageTableTemp.push({indx:i,active:""});
        }
        pageTableTemp[0].active=""
        pageTableTemp[pageIndex-1].active="active"
       setpageTable(pageTableTemp)
    
        axios.get(urlGenres+url,TokenConx())
        .then((resp) =>{ setGenres(resp.data) } )
    }
    
    
    //no admin  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhYmFoMTBAZ21haWwuY29tIiwiZXhwIjoxNjkwODc5NjcxfQ.zRSGk038ZZehqSUzHxEvhycoSo7UnkDi5pe1dmvWYK0
    
    function DeleteGenre(id:number)
    { 
        axios.delete(`${urlGenres}?id=`+id,TokenConx()).then((data)=>alert(data.data))
        console.log(id)
    }
    
    return (<div className="container"> 
        <Link className="btn btn-primary m-2 " to="/genres/create">Create Genres</Link>
       <br></br>
       {
        genres?.map((item) => {
            return <span>
                {item.id} | {item.name} 
                <Link className="btn btn-primary btn-sm m-2" to={`/genres/edite/${item.id}`}>Edite </Link> 
               
                <button className="btn btn-danger btn-sm m-2" onClick={()=>DeleteGenre(item.id)}>Delete </button>
                 <br></br></span>
        })
        }
        
        <div className="container  col-6 ">
            <ul className="pagination container  col-8">
            <li className="page-item col-2 " ><button className="page-link" onClick={()=> handlPagin(CurrentPage-1)} disabled>*</button></li>
                {
                pageTable.map((item)=>{
                    if((item.indx-CurrentPage)<3 && (CurrentPage-item.indx)<3 ) 
                    return<li className={"page-item col-2 "+item.active} >
                              <a className="page-link" onClick={()=> handlPagin(item.indx)} href="#">{item.indx}</a>
                        </li>})
                
                }
                <li className="page-item col-2" ><button className="page-link " onClick={()=> handlPagin(CurrentPage+1)} >*</button></li>
            </ul>

        </div>
    
      
    </div>); 
}
export const MemoShowGenres = React.memo(ShowGenres)