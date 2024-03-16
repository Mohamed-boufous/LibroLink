import React from 'react';
import imageworld from '../assets/internet-earth-globe-svgrepo-com.svg';
import imagepages from '../assets/page-document-my-page-empty-page-svgrepo-com.svg';
import imagevistes from '../assets/open-eye-svgrepo-com.svg';

const VisitCounter = ({ visitCount }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%', // Set the width to 100%
        height: '100%', // Set the height to 100%
        boxSizing: 'border-box', // Include padding and border in the total width/height
       
        maxHeight: '270px',
        // Set the maximum width as needed
      }}
    >
      <div>
        <p className='gender'>genre exemple</p>
        <div className='star-div'>
          <svg
            className='star-svg'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlns:xlink='http://www.w3.org/2000/xlink'
            width='21px'
            height='20px'
          >
            <path d='M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855 l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z' />
          </svg>
          <span>kckckckc</span>
        </div>
        <div className='langague-div1'>
          <img src={imageworld} alt='' className='svg' />jfjjf
          
        </div>
        <div className='pages-div'>
          <img src={imagepages} alt='' className='svg' />
          <span>kfkfkfkf</span>
        </div>
        <div className='langague-div'>
          <img src={imagevistes} alt='' className='svg' />
          <span>kfkfkfkf</span>
        </div>
      </div>
      <div className='button-div'>
        <button className='read-button'>Read</button>
        <div></div>
        <button className='info-button'>Info</button>
      </div>
    </div>
  );
};

export default VisitCounter;
