import { UsernameContext } from "../context/username-context";
import { useContext, useState } from "react";
import { getUsers } from "../api/api";

const Header = () => {
    const { username, setUsername } = useContext(UsernameContext)
    const [userInfo, setUserInfo] = useState(null)

    const getUserInfo = (username) => {
        getUsers(username)
            .then((response) => {
                setUserInfo(response.data.user)
            })

            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <nav id="header">
                <header id="header-column">
                    <section id="header-title">
                        <h1>NC-News</h1>
                    </section>
                    <section id="header-user">
                        {username ? getUserInfo(username) : ""}
                        {userInfo ? <img src={userInfo.avatar_url} style={{ height: "4rem", borderRadius: "1rem" }}></img> : ""}
                    </section>
                </header>
            </nav>
        </>
    );
}

export default Header;


