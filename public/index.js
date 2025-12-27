let offset = 20; // Commence après les 20 premiers articles
let isLoading = false;
let hasMore = true;

window.addEventListener('scroll', () => {
    if (isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) { // 100px avant le bas
        loadMoreArticles();
    }
});

async function loadMoreArticles() {
    isLoading = true;

    try {
        const response = await fetch(`/?offset=${offset}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Erreur réseau');

        const data = await response.json();
        hasMore = data.hasMore;

        const articlesGrid = document.querySelector('.articles-grid');
        data.articles.forEach(article => {
            const articleCard = createArticleCard(article);
            articlesGrid.appendChild(articleCard);
        });

        offset += 20; // Augmente l'offset pour la prochaine fois
    } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
    } finally {
        isLoading = false;
    }
}

function createArticleCard(article) {
    const articleCard = document.createElement('article');
    articleCard.className = 'article-card';

    let html = '';
    if (article.lien_image) {
        html += `<img src="${article.lien_image}" alt="${article.titre}" class="article-image">`;
    }
    html += `
        <div class="article-content">
            <h3><a href="/article/${article.id}">${article.titre}</a></h3>
            <p class="article-meta">
                Par ${article.auteur} • ${article.categorie} •
                ${new Date(article.createdAt).toLocaleDateString('fr-FR')}
            </p>
            <p class="article-excerpt">${article.corps.substring(0, 150)}...</p>
            <a href="/article/${article.id}" class="read-more">Lire la suite</a>
        </div>
    `;

    articleCard.innerHTML = html;
    return articleCard;
}
