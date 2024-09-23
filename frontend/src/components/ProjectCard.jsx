const ProjectCard = (props) => {
    console.log(props);
    
    return ( 
        <>
        <h1>{ props.title }</h1>
        <p>{ props.description }</p>
        <a href={ props.url }></a>
        <img src={`http://localhost:3000/${ props.img }`} alt="" />
        </>
     );
}
 
export default ProjectCard;