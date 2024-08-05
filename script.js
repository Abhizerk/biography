document.getElementById('search-bar').addEventListener('input', function() {
    const searchQuery = document.getElementById('search-bar').value;
    if (searchQuery.length > 2) {
        const suggestUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${searchQuery}`;

        fetch(suggestUrl)
            .then(response => response.json())
            .then(data => {
                const suggestions = data[1]; // Suggestions are in the second element of the response array
                const datalist = document.getElementById('suggestions');
                datalist.innerHTML = ''; // Clear previous suggestions
                suggestions.forEach(suggestion => {
                    const option = document.createElement('option');
                    option.value = suggestion;
                    datalist.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
            });
    }
});

document.getElementById('search-button').addEventListener('click', function() {
    const searchQuery = document.getElementById('search-bar').value;
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${searchQuery}&prop=extracts|info|pageimages&inprop=url&exintro&explaintext&piprop=thumbnail&pithumbsize=200`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const page = Object.values(data.query.pages)[0];

            if (page) {
                const tableBody = document.querySelector('#results-table tbody');
                tableBody.innerHTML = `
                    <tr>
                        <td>Image</td>
                        <td>${page.thumbnail ? `<img src="${page.thumbnail.source}" alt="${searchQuery}">` : 'No image available'}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td>${searchQuery}</td>
                        <td><a href="https://en.wikipedia.org/wiki/${searchQuery}" class="read-more-btn">Read More</a></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>${page.extract || 'N/A'}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Page ID</td>
                        <td>${page.pageid}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Last Edited</td>
                        <td>${new Date(page.touched).toLocaleString()}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Full URL</td>
                        <td><a href="${page.fullurl}" target="_blank">${page.fullurl}</a></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Background</td>
                        <td>Background information here</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Occupation</td>
                        <td>Occupation information here</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Education</td>
                        <td>Education information here</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Interests and Hobbies</td>
                        <td>Interests and hobbies information here</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Family</td>
                        <td>Family information here</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Achievements</td>
                        <td>Achievements information here</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Social Media</td>
                        <td>Social media presence information here</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Personality Traits</td>
                        <td>Personality traits information here</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Goals and Ambitions</td>
                        <td>Goals and ambitions information here</td>
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
