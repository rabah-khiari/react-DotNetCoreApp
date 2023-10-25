import { useEffect, useState } from "react";
import { TokenConx, urlMovie } from "../endpoints";
import { Indivmovies } from "./Indivmovies";
import { movieDTO, movieDTO2 } from "./movies.model";
import axios from "axios";

export function MoviesList(props : moviesListProps)
{
    const [movie,setMovie]=useState<movieDTO2[]>([]);

    let pageTableTemp=[{indx:1,active:"active"}]
    const [numbPage,setNumbPage] =  useState(1);
    const [pageTable,setpageTable] =  useState(pageTableTemp);
    const [CurrentPage,setCurrentPage] =  useState(1);
    const [ratedFilms,setRatedFilms]=useState<number[]>([])
   
    function GetnbPage(){
        let urlnbpage='/GetNumbPage';
        axios.get(urlMovie+urlnbpage)
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
        
        if(localStorage.getItem("token")!==null )
             axios.get(urlMovie+"/IsRated",TokenConx()).then(rep=>setRatedFilms(c=>rep.data));
        setpageTable(c => GetnbPage())
        let url='/GetAll?page=1';
        axios.get(urlMovie+url)
        .then((resp) =>{ setMovie(c =>resp.data); } )
       
    },[])
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
    
        axios.get(urlMovie+url)
        .then((resp) =>{ setMovie(c=>resp.data) } )
    }
    if(!movie){
        return (  <div className="spinner-border text-primary"></div>);
    }else if (movie.length ===0 )
    {
        return (<div>no movies </div>);
    }else {
         return (<> 
         
         <div className="row "> 

            {movie?.map(movie => 
                <Indivmovies movie={movie} rated={ratedFilms} key ={movie.id}></Indivmovies>)}

        </div>

        {/*pagination */}
        <br />
        <div className="container  col-6 ">
            <ul className="pagination container  col-8">
                <li className="page-item col-2 " ><a className="page-link" onClick={()=> handlPagin(CurrentPage-1)} >*</a></li>
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
        </>);
    }
}
interface moviesListProps{
    movies? : movieDTO2[];
}