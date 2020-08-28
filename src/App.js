import React, { useEffect, useState } from 'react';
import tmdb from './api/tmdb';
import './App.css';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [blackHeader, setBlackHeader] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      let list = await tmdb.getHomeList();
      setMovieList(list);

      let originals = list.find(i => i.slug === 'originals');
      let randomChoosen = Math.floor(Math.random() * (originals.list.results.length));
      let choosen = originals.list.results[randomChoosen];
      let choosenInfo = await tmdb.getMediaInfo(choosen.id, 'tv');
      setFeaturedMovie(choosenInfo);
    }
    loadAll();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setBlackHeader(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [])

  return (
    <div className="page">
      <Header isBlack={blackHeader} />
      {featuredMovie && <FeaturedMovie item={featuredMovie} />}
      <section className="lists">
        {movieList && movieList.map((item, key) => (
          <MovieRow title={item.title} items={item.list} key={key} />
        ))}
      </section>
    </div>
  );
}

export default App;
