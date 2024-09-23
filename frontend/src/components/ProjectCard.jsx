const ProjectCard = (props) => {
    console.log(props);
    
    return ( 
        <>
        <h1>{ props.title }</h1>
        <p>{ props.description }</p>
        <a href={ props.url }></a>
        <img src={`https://portfolio-2fp9.onrender.com/${ props.img }`} alt="" />
        </>
     );
}
 
export default ProjectCard;
