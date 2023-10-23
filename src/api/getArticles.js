import axios from 'axios';

const getArticles = () => {
    return axios
        .get('https://northcoders-news-api-ibfk.onrender.com/api/articles')
}

export default getArticles;