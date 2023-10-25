import { useState } from "react";
import { Link } from "react-router-dom";

export function CreatTheaters(){
    const [name,setName]=useState("");

    function handleSubmit(e:any) {
        e.preventDefault();
        console.log(name);
      }
    return (<>
        <h2>Creat Theaters</h2>
        <form onSubmit={handleSubmit}>
            <label >Name:</label>
            <input type="text" className="form-control mt-3" value={name} onChange={(e)=>setName(e.target.value)} name="name" ></input>
            <button className="btn btn-primary" type="submit"> create </button>
        </form>
    </>);
}