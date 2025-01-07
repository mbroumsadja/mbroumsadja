import express from "express";

const Droute = express.Router();

Droute.get('/',(req, res) =>{
    const session = req.body.user;

    const Articles = [
      {
            source: { name: "NBCSports.com" },
            author: "Josh Alper",
            title: "Zach Ertz: It comes down to having a really good QB...",
            description: "The Commanders' turnaround from a 4-13 record...",
            url:"http://localhost:3000",
            urlToImage: "path_to_image",
            publishedAt: "2024-12-30T11:23:11Z"
        },

    ];
    res.render('index',{
        session:session,
        Articles:Articles,
    })
});

Droute.get('/admin',(req, res) =>{
    res.render('newArticle');
})
export default Droute;
