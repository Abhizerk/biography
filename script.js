document.getElementById('search-button').addEventListener('click', function() {
    const searchQuery = document.getElementById('search-bar').value;
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${searchQuery}&prop=extracts&exintro&explaintext`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const page = Object.values(data.query.pages)[0];
            const extract = page.extract;

            if (extract) {
                const tableBody = document.querySelector('#results-table tbody');
                tableBody.innerHTML = `
                    <tr>
                        <td>Full Name</td>
                        <td>${searchQuery}</td>
                        <td><a href="https://en.wikipedia.org/wiki/${searchQuery}" class="read-more-btn">Read More</a></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>${extract}</td>
                        <td></td>
                    </tr>
                `;
                document.getElementById('results-table').style.display = 'table';
            } else {
                alert('No results found.');
                document.getElementById('results-table').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data.');
        });
});
