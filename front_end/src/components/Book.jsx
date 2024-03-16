import React, { useState } from 'react';
import VisitCounter from './HoverItem';

const Book = ({ title, image, highlight, visitCount }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
        flex: '0 0 30%',
        maxWidth: '120px',
        cursor: 'pointer',
        backgroundColor: highlight ? 'lightyellow' : 'white',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <VisitCounter visitCount={visitCount} />}
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <h3>{title}</h3>
    </div>
  );
};

export default Book;
