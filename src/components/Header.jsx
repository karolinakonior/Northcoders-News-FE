import { UsernameContext } from "../context/username-context";
import { useContext, useEffect, useState } from "react";
import { getUsers } from "../api/api";

const Header = () => {
    const { username, setUsername } = useContext(UsernameContext);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getUsers(username)
            .then((response) => {
                setUserInfo(response.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [username]);

    return (
        <>
            <nav id="header">
                <header id="header-column">
                    <section id="header-title-user">
                        <section id="header-title">
                            <h1>NC-News</h1>
                        </section>
                        </section>
                        <section id="header-user">
                            {username ?? ""}
                            {userInfo ? <img src={userInfo.avatar_url} style={{ height: "4rem", borderRadius: "1rem" }}></img> : ""}
                        </section>
                    
                </header>
            </nav>
        </>
    );
}

export default Header;


