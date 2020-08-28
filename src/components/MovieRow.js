import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({ title, items }) => {
  const [scrollX, setScrollX] = useState(-400);

  const handleLeftArrow = () => {
    const scrollSize = Math.round(window.innerWidth / 2);
    if (scrollX + scrollSize > 0)
      setScrollX(0);
    else
      setScrollX(scrollX + scrollSize);
  };

  const handleRightArrow = () => {
    const scrollTo = scrollX - Math.round(window.innerWidth / 2);
    const listW = (150 * items.results.length);
    if (window.innerWidth - listW > scrollTo)
      setScrollX(window.innerWidth - listW - 60);
    else
      setScrollX(scrollTo);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left">
        <NavigateBeforeIcon style={{ fontSize: 50 }} onClick={handleLeftArrow} />
      </div>
      <div className="movieRow--right">
        <NavigateNextIcon style={{ fontSize: 50 }} onClick={handleRightArrow} />
      </div>
      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{ marginLeft: scrollX, width: 150 * items.results.length }}>
          {items.results.length > 0 && items.results.map((item, key) => (
            <div className="movieRow--item" key={key}>
              <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} key={key} alt={item.original_title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}