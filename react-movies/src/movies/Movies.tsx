import { Link, Outlet } from "react-router-dom";


export function Movies(){
   
    
   return (<>
        <h2> Movies </h2>
        <Link className="btn btn-primary m-2 " to="/movies/create">Create movies</Link>
       <Link className="btn btn-primary m-2" to="/movies/edite">Edite movies</Link>
       <Link className="btn btn-primary m-2" to="/movies/filter">Filter movies</Link>
       
       
       <div className="container border"> <Outlet /></div>
    </>);
}