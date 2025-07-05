import React, { useState, useEffect } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import AnimeCard from './components/AnimeCard.jsx';
import { useDebounce } from 'react-use';
import { getTrendingAnime, updateSearchCount } from './appwrite.js';

const App = () => {
  const [searchname, setsearchname] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchname), 500, [searchname]);

  const fetchAnime = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query || 'naruto')}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        setErrorMessage('No anime found');
        setAnimeList([]);
        return;
      }

      setAnimeList(data.data);

      if (query && data.data.length > 0) {
        await updateSearchCount(query, data.data[0]);
      }
    } catch (error) {
      console.error(`Error fetching anime: ${error}`);
      setErrorMessage('Error fetching anime. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingAnimes = async () => {
    try {
      const animes = await getTrendingAnime();
      setTrendingAnime(animes);
    } catch (error) {
      console.error(`Error fetching trending animes: ${error}`);
    }
  };

  useEffect(() => {
    fetchAnime(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingAnimes();
  }, []);

  return (
    <main className="dark-hero-bg min-h-screen">
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1 className="text-4xl">
            <img src="./hero-bg8.png" alt="Hero Banner" />
           I'm not gonna run away, I never go back on my word! That's my nindō: my <span className="text-gradient"> ninja way! </span> 
          </h1>
          <Search searchname={searchname} setsearchname={setsearchname} />
        </header>

     {trendingAnime.length > 0 && (
  <section className="trending">
    <h2>Trending Animes</h2>
    <ul>
      {trendingAnime.map((anime, index) => (
        <li key={anime.$id}>
          <p>{index + 1}</p>
          <img src={anime.poster_url} alt={anime.title} />
        </li>
      ))}
    </ul>
  </section>
)}


        <section className="all-movies">
          <h2>All Animes</h2>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {isLoading ? (
            <Spinner />
          ) : (
            <ul>
              {animeList.map((anime) => (
                <li key={anime.mal_id}>
                  <AnimeCard anime={anime} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
