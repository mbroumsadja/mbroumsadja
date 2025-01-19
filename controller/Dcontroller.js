import { newsapi } from "../config/api.js";
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

import axios from 'axios';

async function fetchArticles() {
	try {
       const url = "https://newsapi.org/v2/everything?q=tesla&from=2021-08-02&sortBy=publishedAt&apiKey=32a29c4d9eb14017a580dca524bb291f"
	          const urls = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=32a29c4d9eb14017a580dca524bb291f"
		const response = await axios.get(urls);

		if (response.data && response.data.articles) {
			return response.data.articles; 
		} else {
			console.error('Aucun article trouvé.');
			return [];
		}
	} catch (error) {
		console.error('Erreur lors de la récupération des articles :', error.message);
		return [];
	}
}

 export default fetchArticles;


