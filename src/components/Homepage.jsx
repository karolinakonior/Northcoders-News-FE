import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const nav = useNavigate();

    useEffect(() => {
        nav(`/articles/all`)
    }, [])

    return (  
        <>
        </>
    );
}
 
export default Homepage;