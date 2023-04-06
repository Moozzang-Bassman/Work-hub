import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSlide(true);
    }, 10);
    setTimeout(() => {
      setSlide(false);
    }, 2500);
    setTimeout(() => {
      navigate('/login');
    }, 3500);
  }, []);

  return (
    <LayOut>
      <Logo slide={slide}>
        Work{' '}
        <span
          style={{
            background: '#FF9900',
            padding: '0px 12px',
            color: 'black',
            borderRadius: '8px',
          }}
        >
          hub
        </span>
      </Logo>
    </LayOut>
  );
}

export default Main;
const Logo = styled.div`
  background-color: black;
  color: white;
  font-size: 10rem;
  font-weight: 700;
  padding: 16px 40px;
  border-radius: 10px;
  white-space: nowrap;
  cursor: pointer;

  transform: ${(props) =>
    !props.slide ? 'translateX(-100vw) rotate(-45deg)' : 'translateX(0vw)'};
  transition: transform 0.7s;
  transition-delay: 0.3s;

  transform-origin: 10% 50%;
  animation-name: shake;
  animation-duration: 0.7s;
  animation-iteration-count: initial;
  animation-delay: 1.2s;
  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(1deg);
    }
    20% {
      transform: rotate(-2deg);
    }
    30% {
      transform: rotate(3deg);
    }
    40% {
      transform: rotate(-2deg);
    }
    50% {
      transform: rotate(1deg);
    }
    60% {
      transform: rotate(-1deg);
    }
    70% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const LayOut = styled.div`
  display: flex;

  height: 100vh;
  align-items: center;
  justify-content: center;

  /* background-color: #ff9900; */
`;
