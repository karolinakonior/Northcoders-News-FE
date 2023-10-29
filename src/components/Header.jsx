import { UsernameContext } from "../context/username-context";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../api/api";

const Header = () => {
    const { username } = useContext(UsernameContext);
    const [userInfo, setUserInfo] = useState(null);
    const [err, setErr] = useState("")

    useEffect(() => {
        getUser(username)
            .then((response) => {
                setUserInfo(response.data.user)
            })
            .catch((err) => {
                setErr("Something went wrong, please try again.")
            })
    }, [username]);

    return (
        <header id="header">
            <section id="header-title">
                <h1>NC-News</h1>
                {err ? err : null}
            </section>

            <section className="flex-center-align">
                <section style={{ marginRight: "1rem" }}>{username ?? ""}</section>
                {userInfo ? <img src={userInfo.avatar_url} style={{ height: "3.5rem" }} ></img> : ""}
            </section>
        </header>
    );
}

export default Header;