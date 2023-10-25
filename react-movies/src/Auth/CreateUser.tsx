import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { urlAccount, urlGenres } from "../endpoints";
export function CreatUser(){
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const navigate= useNavigate();
    const [errors,setErrors]=useState(""); 
    
    function handleSubmit(e:any) {
        e.preventDefault();
        
        let Credential= {
            email : "",
            password:""
            
        }

        Credential.email=name
        Credential.password=password
        console.log(Credential)
             axios.post(urlAccount+"/create",Credential)
            .then((rep)=>{ 
                //navigate("/genres"); 
                //window.location.reload();
                console.log(rep.data) }  )
            .catch(
                function (error) {
                  console.log('Show error notification!')
                  
                  console.log(error)
                }
              )
           
      }

    console.log(name)
    return (<>
        <h2>Creat User</h2>
        <Link className="btn btn-primary m-2 " to="/Login">Login</Link>
        <form onSubmit={handleSubmit} className="container">
            <label >Name:</label>
            <input type="text"  className="form-control mt-3" value={name} onChange={(e)=>setName(e.target.value)}  ></input>
            
            <label >Password:</label>
            <input type="password"  className="form-control mt-3" value={password} onChange={(e)=>setPassword(e.target.value)}  ></input>
            
            <div className="container bg-danger text-white " role="alert">
                     {errors}
            </div>
            <button className="btn btn-primary"> create </button>
           
        </form>
        
        
    </>);
}