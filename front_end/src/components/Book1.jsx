import React, { useState } from 'react';
import VisitCounter from './VisitCounter1';

const Book = ({ title, image, highlight, visitCount }) => {
  const [isHovered, setIsHovered] = useState(false);




  return (
    <div
      style={{
        position: 'relative',
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
        display: 'inline-block',
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
          height: '260px',
          objectFit: 'cover',
        }}
       
      />
     
    </div>
  );
};

export default Book;
