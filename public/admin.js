document.addEventListener('DOMContentLoaded', function() {
    loadStatistics();
});

async function loadStatistics() {
    try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
            throw new Error('Erreur HTTP: ' + response.status);
        }
        const data = await response.json();
        console.log('Données reçues:', data); // Debug

        // Mettre à jour les totaux seulement si les données existent
        if (data.totalArticles !== undefined) {
            document.getElementById('totalArticles').textContent = data.totalArticles;
        }
        if (data.totalCommentaires !== undefined) {
            document.getElementById('totalCommentaires').textContent = data.totalCommentaires;
        }
        if (data.totalClients !== undefined) {
            document.getElementById('totalClients').textContent = data.totalClients;
        }

    } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        // Ne pas écraser les valeurs si erreur
    }
}