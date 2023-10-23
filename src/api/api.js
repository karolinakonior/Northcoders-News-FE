import axios from 'axios';

const articlesApi = axios.create({
  baseURL: 'https://northcoders-news-api-ibfk.onrender.com/api'
});

export function getArticles() {
  return articlesApi.get('/articles')
}

export function getArticle(article_id) {
  return articlesApi.get(`/articles/${article_id}`)
}

export function getComments(article_id) {
  return articlesApi.get(`/articles/${article_id}/comments`)
}

export function addArticleVotes(article_id) {
  const product = { "inc_votes": 1 };
  return articlesApi.patch(`https://northcoders-news-api-ibfk.onrender.com/api/articles/${article_id}`, product)
}

export function subtractArticleVotes(article_id) {
  const product = { "inc_votes": -1 };
  return articlesApi.patch(`https://northcoders-news-api-ibfk.onrender.com/api/articles/${article_id}`, product)
}

