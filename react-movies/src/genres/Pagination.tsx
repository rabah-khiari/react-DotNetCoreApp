export function Pagination(props :any)
{   
    let active="";
    if(props.active) active="active";
    return(<>
    <li className={"page-item "+active}> <a className="page-link" onClick={()=> props.handlPagin(props.item)} href="#">{props.item}</a></li>
    </>);
}