import React from 'react';

const AnimeCard = ({
  anime: { title, images, score, year, aired, episodes }
}) => {
  return (
    <div className="movie-card">
      <img
        src={images?.jpg?.image_url || '/no-movie.png'}
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{score ? score.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
          <p className="lang">{episodes ? `${episodes} eps` : 'N/A'}</p>

          <span>•</span>
          <p className="year">
            {aired?.from ? new Date(aired.from).getFullYear() : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
