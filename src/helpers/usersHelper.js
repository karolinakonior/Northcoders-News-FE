import userIcon from '../images/user-icon.png';

const getUserIconUrl = (users, userName) => {
    if (users !== undefined && users.length > 0) {
        let user = users.find(x => x.username === userName);
        return user !== null ? user.avatar_url : userIcon;
    }
    return userIcon;
}

export default getUserIconUrl;