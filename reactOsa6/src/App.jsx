import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [allRepos, setAllRepos] = useState([]); // Alkuperäinen lista kaikista repositorioista
  const [filteredRepos, setFilteredRepos] = useState([]); // Suodatettu lista hakusanan mukaan
  const [keyword, setKeyword] = useState(''); // Hakusana

  // Haetaan repositoriot heti, kun komponentti ladataan
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/search/repositories?q=react');
        if (!response.ok) {
          throw new Error('Tietojen hakeminen epäonnistui.');
        }
        const responseData = await response.json();
        setAllRepos(responseData.items); // Asetetaan kaikki repositoriot stateen
        setFilteredRepos(responseData.items); // Aluksi näytetään kaikki
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchRepositories();
  }, []);

  // Suodatetaan repositoriot, kun hakusana muuttuu
  const handleSearch = (e) => {
    const searchKeyword = e.target.value.toLowerCase();
    setKeyword(searchKeyword);

    // Suodatetaan repositoriot hakusanan perusteella
    const filtered = allRepos.filter((repo) =>
      repo.full_name.toLowerCase().includes(searchKeyword)
    );
    setFilteredRepos(filtered);
  };

  return (
    <>
      <h2>GitHub Repositoriot</h2>
      {/* Hakukenttä */}
      <div>
        <input
          type="text"
          placeholder="Hae repoja..."
          value={keyword}
          onChange={handleSearch} // Kutsutaan suodatusfunktiota, kun käyttäjä kirjoittaa
        />
      </div>

      {/* Näytetään repositoriot taulukossa */}
      <table>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredRepos.map((repo) => (
            <tr key={repo.id}>
              <td>{repo.full_name}</td>
              <td>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.html_url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
