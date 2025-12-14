import NewsAPI from "newsapi";
import dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

export const newsapi = new axios.create({
    baseURL:'https://newsapi.org/v2',
    headers:{Authorization:`Bearer process.env.API_KEY`}
});