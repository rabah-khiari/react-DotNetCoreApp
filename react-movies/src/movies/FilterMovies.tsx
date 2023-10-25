import { Link, Outlet } from "react-router-dom";
import { filterMoviesForm, genreDTO } from "./movies.model";
import { useState } from "react";

export function FilterMovies(){
    const initialValues : filterMoviesForm = {
        title:"",
        genreId:0,
        upcomingReleases :false,
        inTheaters : false, 
    }
    function handleSubmit(e:any) {
        initialValues.genreId=genreId;
        initialValues.title=title;
        initialValues.inTheaters=inThet;
        initialValues.upcomingReleases=upCom;
        e.preventDefault();
        console.log("id :"+initialValues.genreId+" title : "+initialValues.title+" upc : "+initialValues.upcomingReleases+" inth : "+
        initialValues.inTheaters)
      }
      
  
    const genre : genreDTO[] =[{id:1,name:"drama"},{id:2,name:"comedy"},{id:3,name:"action"}];
    const [title,setTitle]=useState("");
    const [genreId,setGenreId]=useState(0);
    const [upCom,setUpCom]=useState(false);
    const [inThet,setinThet]=useState(false);
    
   return (<>
        <h2>Filters Movies</h2>

       <form className="container" onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
                <label className="form-label">Title:</label>
                <input type="text" className="form-control" value={title} 
                onChange={(e)=>{setTitle(e.target.value) }}></input>
            </div>
            
            <div className="form-check mb-3">
                <label className="form-check-label">
                <input className="form-check-input" type="checkbox" checked={upCom} onChange={(e)=>{setUpCom(e.target.checked)}}></input>
                 Upcoming  
                </label>
            <div className="form-check mb-3">
                <label className="form-check-label">
                <input className="form-check-input" type="checkbox" checked={inThet}  onChange={(e)=>{setinThet(e.target.checked)}}></input>
                in Theaters
            </label>
            </div>
            </div>
            <label  className="form-label">Select list (select one):</label>
            <select className="form-select"value={genreId} onChange={(e)=>{setGenreId(Number(e.target.value)) }} >
                    <option value={0}>---genre---</option>
                {
                    genre.map(item=><option value={item.id}>{item.name}</option>)
                }

            </select>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button  className="btn btn-danger" onClick={()=>{setTitle("");setGenreId(0);setUpCom(false);setinThet(false)}}>
            Submit</button>
        </form>
       <div className="container border"> <Outlet /></div>
    </>);
}