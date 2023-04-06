import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  return (
    <NavBar>
      <img
        onClick={() => {
          navigate('/');
        }}
        style={{
          background: 'black',
          borderRadius: '8px',
          height: '38px',
          cursor: 'pointer',
        }}
        src="logo.png"
      ></img>

      <div>
        <Img imgSize="small"></Img>
      </div>
    </NavBar>
  );
}

export default Nav;
const NavBar = styled.div`
  height: 64px;
  background-color: white;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 5px lightgray;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Img = styled.img`
  width: ${(props) => {
    if (props.imgSize === 'medium') {
      return '56px';
    }
    if (props.imgSize === 'small') {
      return '42px';
    }
  }};
  height: ${(props) => {
    if (props.imgSize === 'medium') {
      return '56px';
    }
    if (props.imgSize === 'small') {
      return '42px';
    }
  }};
  border-radius: 50%;
  background-color: #f89817;
  box-sizing: border-box;
  border: 4px solid black;
`;
