import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { urlActors } from "../endpoints";
import axios from "axios";

export function ShowActors(){

    const [Actors,setActors] =  useState<ActorDTO[]>([]);
    let pageTableTemp=[{indx:1,active:"active"}]
    const [numbPage,setNumbPage] =  useState(1);
    const [pageTable,setpageTable] =  useState(pageTableTemp);
    const [CurrentPage,setCurrentPage] =  useState(1);

   
    function GetnbPage(){
        let urlnbpage='/GetNumbPage';
        axios.get(urlActors+urlnbpage)
        .then(resp => { 
            setNumbPage(c=> resp.data)
            for(let i=2;i<=resp.data;i++)
            {
            pageTableTemp.push({indx:i,active:""});
            }
        })
        return pageTableTemp;
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
    
        axios.get(urlActors+url)
        .then((resp) =>{ setActors(resp.data) } )
    }


    useEffect(()=>{
        let url='/GetAll?page=1';
       
        setpageTable(c => GetnbPage())
    axios.get(urlActors+url)
    .then((resp) =>{ setActors(resp.data) } )
    },[])

    function DeleteGenre(id:number)
    { 
        axios.delete(`${urlActors}?id=`+id).then((data)=>console.log(data))
        console.log(id)
    }
    return (<>
        
        <br></br>
       {
        Actors?.map((item) => {
            return <span>
                {item.id} | {item.name} | {item.biography} 
                <img width={100} src={urlActors+"/DownloadFile?filename="+item.picture}  />
                <Link className="btn btn-primary btn-sm m-2" to={`/actors/edite/${item.id}`}>Edite </Link> 
               
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
       
    </>);
}

export interface ActorDTO{
    id:number;
    name : string,
    dateOfBirth :Date,
    biography :string,
    picture : string,
    userId : string
}