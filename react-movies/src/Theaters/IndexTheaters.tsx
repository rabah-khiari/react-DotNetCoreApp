import { Link, Outlet } from "react-router-dom";

export function IndexTheaters(){
    return (<>
        <h2>Theaters</h2>
        <Link className="btn btn-primary m-2 " to="/theaters/create">Create Theaters</Link>
       <Link className="btn btn-primary m-2" to="/theaters/edite">Edite Theaters</Link>
       <div className="container border"> <Outlet /></div>
    </>);
}