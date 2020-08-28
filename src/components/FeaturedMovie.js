import React from 'react';
import './FeaturedMovie.css';

export default ({ item }) => {
  let first_date = new Date(item.first_air_date);
  return (
    <section className="featured" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }}>
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} pontos</div>
            <div className="featured--year">{first_date.getFullYear()}</div>
            <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
          </div>
          <div className="featured--description">{item.overview}</div>
          <div className="featured--buttons">
            <a className="featured--watchbutton" href={`/watch/${item.id}`}>► Assistir</a>
            <a className="featured--listbutton" href={`/list/add/${item.id}`}>+ Minha Lista</a>
          </div>
          <div className="featured--genres"><strong>Gêneros:</strong> {item.genres.map(i => i.name).join(', ')}</div>
        </div>
      </div>
    </section>
  );
}