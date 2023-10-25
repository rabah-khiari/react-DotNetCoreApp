import { useEffect, useState } from "react";
import { movieDTO, movieDTO2 } from "./movies.model";
import { TokenConx, urlMovie } from "../endpoints";
import axios from "axios";
import { Link } from "react-router-dom";

export function Indivmovies(props : any)
{
  
    const [s1,setS1]=useState(false)
    const [s2,setS2]=useState(false)
    const [s3,setS3]=useState(false)
    const [s4,setS4]=useState(false)
    const [s5,setS5]=useState(false)
    
    var rated=props.rated;
    var movieprops=props.movie
    
    let rateFilm=movieprops.rating.toString();
    if(rateFilm.length>1){
      let rateNew= movieprops.rating.toString().split('.')
       rateFilm= rateNew[0]+'.'+rateNew[1].charAt(0);
    } 

    const RatingStars =()=>{
      if(localStorage.getItem("token")!==null && !(rated.includes(movieprops.id)))
    
      return (<>
      <div className=" flex mt-0 pt-0 "><span className="fa-2x "> rate the film </span> 
            <span className={"fa fa-star fa-2x cheked"+s1} onClick={()=>{setS1(!s1);setS2(false);setS3(false);setS4(false);setS5(false);Rate(1,movieprops.id);}}  ></span>
            <span className={"fa fa-star fa-2x cheked"+s2} onClick={()=>{setS1(!s2);setS2(!s2);setS3(false);setS4(false);setS5(false);Rate(2,movieprops.id);}}></span>
            <span className={"fa fa-star fa-2x cheked"+s3} onClick={()=>{setS1(!s3);setS2(!s3);setS3(!s3);setS4(false);setS5(false);Rate(3,movieprops.id);}}></span>
            <span className={"fa fa-star fa-2x cheked"+s4} onClick={()=>{setS1(!s4);setS2(!s4);setS3(!s4);setS4(!s4);setS5(false);Rate(4,movieprops.id);}}></span>
            <span className={"fa fa-star fa-2x cheked"+s5} onClick={()=>{setS1(!s5);setS2(!s5);setS3(!s5);setS4(!s5);setS5(!s5);Rate(5,movieprops.id);}}></span>
        
       </div>
      </>);
      else { 
        if(localStorage.getItem("token")==null){
          return(<> <div>connect to rate the film : <Link className="text-dark font20 " to="/login" >Login</Link> </div> </>)
        }else return(<> <div>you already rate the film  </div> </>)
        }
    }

    function Rate(rate:number,id:number){
      axios.get(urlMovie+"/RateMovie?idMovie="+id+"&rating="+rate,TokenConx());
    }
    const buildLink= ()=> `/movies/${movieprops.id}`;
    return(<div className=" col-sm-12 col-md-4 col-lg-3 ps-0 pe-0 cardMovie">
        
        <div className="card shadow rounded cardMovieInside " >
            <img className="card-img-top ps-1 pe-1 pt-1 imgMovie" src={urlMovie+"/DownloadFile?filename="+movieprops.image} alt="poster" style={{width:"100%"}}/>
            <div className="card-body pt-1 mb-0 title ps-0 pe-0">
                <p className="card-title">{movieprops.title}</p>
                <p className="card-text  mb-0 cardMovieText">{movieprops.description} </p>
            </div>
            <a href={buildLink()} className="btn btn-primary btnMovie" data-bs-toggle="modal" data-bs-target={"#myModal"+movieprops.id}>See Profile </a>
        </div>    
        <div className="modal" id={"myModal"+movieprops.id}>
  <div className="modal-dialog">
    <div className="modal-content">

    
      <div className="modal-header ">
        <h5 className="modal-title text-dark">{movieprops.title}</h5>
        
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      
      <div className="modal-body text-dark"> 
       <div className="row mb-0">
          <h5 className="col-1 mb-0 chekedtrue ">{rateFilm } </h5> 
          <p className="col-1 mt-1 pt-1 ms-1 mb-0 ">({movieprops.rateNbr})</p> 
       </div>
       {RatingStars()}
     
      <img className="card-img-top ps-1 pe-1 pt-1 imgMovie" src={urlMovie+"/DownloadFile?filename="+movieprops.image} alt="poster" style={{width:"100%"}}/>
      
      </div>

      <div className="modal-footer text-dark">
      {movieprops.title} is a great film u have to show it . John Doe is an engineer
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>


    </div>);
}