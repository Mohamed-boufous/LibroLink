// StarRating.js

import React, { useState } from "react";


const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div className="star-rating-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? "selected" : ""}`}
          onClick={() => handleStarClick(star)}
        >
          &#9733; {/* Unicode character for a star */}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
