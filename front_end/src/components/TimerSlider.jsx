import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Importez vos images ici
import image1 from '../assets/Rectangle 5.png';
import image2 from '../assets/Rectangle 5 (3).png';
import image3 from '../assets/Rectangle5(4).png';
import image4 from '../assets/Rectangle5(1) copy 2.png';
import image5 from '../assets/Rectangle6.png';
import image6 from '../assets/image6.png';



const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: -100px;
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;

const ImageLabel = styled.div`
  text-align: center;
  margin-top: 10px;
  display: ${(props) => (props.isCenter ? 'none' : 'block')};
`;

const SliderImage = styled.img`
  width: 150px;
  height: 100%;
  margin: 0 60px;
  border: ${(props) => (props.isCenter ? '0' : '3px solid orange')};
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;

  &.center-image {
    transform: scale(1.2);
    opacity: 1;
  }

  &:not(.center-image) {
    opacity: 0.7;
  }

  @media (min-width: 600px) {
    margin: 0 30px; /* Réinitialisation pour tous les écrans d'au moins 600px */
    
    /* Appliquer un margin supplémentaire aux images de gauche et de droite */
    &:first-child { margin-right: 60px; }
    &:last-child { margin-left: 60px; }
  }

  @media (max-width: 1000px) {
    width: 120px;
    margin: 0 50px;
  }

  @media (max-width: 800px) {
    width: 100px;
    margin: 0 40px;
  }

  @media (max-width: 600px) {
    width: 80px;
    margin: 0 15px;
  }
`;


import leftButtonImage from '../assets/Vector (2).png';
import rightButtonImage from '../assets/Vector (1).png';



const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const AutoImageSlider = () => {
  const images = [image1, image2, image3, image4, image5, image6];
  const imageNames = ["book 1", "book 2", "book 3", "book 4", "book 5", "book 6"];
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1 className='text-4xl text-center'>Our Best Products </h1>
<CenteredContainer>
      <SliderContainer>
        <NavButton onClick={handlePrev} style={{ left: 0 }}>
          <img src={leftButtonImage} alt="Précédent" style={{ width: '30px', height: '30px' }} />
        </NavButton>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <SliderImage
              src={images[(startIndex + index) % images.length]}
              alt={`Slide ${startIndex + index + 1}`}
              className={index === 1 ? 'center-image' : ''}
              isCenter={index === 1}
            />
            <ImageLabel isCenter={index === 1}>
              {imageNames[(startIndex + index) % images.length]}
            </ImageLabel>
          </div>
        ))}
        <NavButton onClick={handleNext} style={{ right: 0 }}>
          <img src={rightButtonImage} alt="Suivant" style={{ width: '30px', height: '30px' }} />
        </NavButton>
      </SliderContainer>
    </CenteredContainer>
    </div>
    
  );
};
export default AutoImageSlider;
