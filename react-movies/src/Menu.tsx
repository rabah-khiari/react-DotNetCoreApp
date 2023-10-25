import { Link, useNavigate } from "react-router-dom";
import "./assets/css/style.css";
import { useState } from "react";

export function Menu()
{
    const navigate = useNavigate();
   
    function login (){
       
       if(localStorage.getItem("token")==null)
       { 
        return (<>
            <li className="nav-item"><Link className="nav-link font20 " to="/login" >Login</Link></li>
            <li className="nav-item" ><Link className="nav-link font20" to="/user">Sign up</Link></li>
        </>);
       }else  return (<>
           <li className="nav-item">
                   <Link className="nav-link font20" to="/" onClick={()=>{
                         localStorage.removeItem("token")
                         localStorage.removeItem("mail")
                         navigate("/");
                          }}>Logout | {localStorage.getItem("mail")} </Link>
           </li>
       </>);
   }
 
    return  (<>

   <nav className="navbar navbar-expand-sm  pt-0 ">
        <div className="container-fluid  nav22 pb-2" >
            <a className="navbar-brand font20" href="javascript:void(0)">Logo</a>
            <button className="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon "></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto "> 
                    <li className="nav-item">
                    <Link className="nav-link font20 "  to="/"> Movies</Link>
                    </li>
                    <li className="nav-item " >
                    <Link className="nav-link font20" to="/genres">Genres</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link font20" to="/other">other</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle plusnav" href="#" role="button" data-bs-toggle="dropdown">plus</a>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item plusItem " to="/theaters">theaters</Link></li>
                            <li><Link className="dropdown-item plusItem" to="/actors">actors </Link></li>
                            <li><Link className="dropdown-item plusItem" to="movies">movies</Link></li>
                            <li><Link className="dropdown-item plusItem" to="/construction">Construction</Link></li>
                            
                        </ul>
                    </li>
                    {
                        login()
                    }
                    
                </ul>
                <form className="d-flex">
                    <input className="form-control me-2 searchInp " type="text" placeholder="Search"></input>
                    <button className="btn btn-primary searchBtn"  type="button">Search</button>
                </form>
            </div>
        </div>
    </nav>
    
   </>);

}