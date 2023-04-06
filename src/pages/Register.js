import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
  useEffect(() => {
    setTimeout(() => {
      setIsPageRendering(true);
    }, 10);
  }, []);
  const [isIdLabelAnimation, setIsIdLabelAnimation] = useState(false);
  const [isPwLabelAnimation, setIsPwLabelAnimation] = useState(false);
  const [isUserNameLabelAnimation, setIsUserNameLabelAnimation] =
    useState(false);
  const [isPageRendering, setIsPageRendering] = useState(false);
  const [idInputValue, setIdInputValue] = useState('');
  const [pwInputValue, setPwInputValue] = useState('');
  const [userNameInputValue, setUserNameInputValue] = useState('');
  const [isIdValidation, setIsIdValidation] = useState(true);
  const [isPwValidation, setIsPwValidation] = useState(true);
  const [isUserNameValidation, setIsUserNameValidation] = useState(true);
  const navigate = useNavigate();
  const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}|\.[a-z]{2,3}\.[a-z]{2,3}/;
  const PwReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
  return (
    <Layout>
      <LoginBox isPageRendering={isPageRendering}>
        <TitleWrap>
          <Title>회원가입</Title>
        </TitleWrap>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isIdValidation && isPwValidation && isUserNameValidation) {
              console.log('회원가입 유효성 테스트 완료');

              axios
                .post(
                  `${process.env.REACT_APP_SERVER_URL}/api/users/register`,
                  {
                    email: idInputValue,
                    password: pwInputValue,
                    userName: userNameInputValue,
                    userJob: '촐랑이',
                    userDesc: '안녕하신가',
                  }
                )
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                  if (error.data.message === 'duplicate email') {
                    setIsIdValidation(false);
                  }
                });
            }
          }}
        >
          <InputWrap>
            <InputBox
              style={{ borderColor: isIdValidation ? '' : '#d82a20' }}
              isIdLabelAnimation={isIdLabelAnimation}
            >
              <label
                style={{
                  cursor: 'text',
                  color: isIdValidation ? '' : '#d82a20',
                }}
                htmlFor="inputId"
                className="isIdLabelAnimation"
              >
                이메일
              </label>
              <Input
                autoComplete="on"
                required="required"
                id="inputId"
                value={idInputValue}
                onChange={(e) => {
                  setIdInputValue(e.target.value);
                }}
                onFocus={() => {
                  setIsIdLabelAnimation(true);
                }}
                onBlur={() => {
                  if (!idInputValue) {
                    setIsIdLabelAnimation(false);
                    setIsIdValidation(false);
                  } else {
                    setIsIdValidation(emailReg.test(idInputValue));
                  }
                }}
              ></Input>
            </InputBox>
            <AlertMsgWrap>
              <AlertMsg type="alert">
                {isIdValidation
                  ? ''
                  : '중복 또는 유효하지 않은 메일 주소입니다'}
              </AlertMsg>
            </AlertMsgWrap>
          </InputWrap>
          <InputWrap>
            <InputBox
              style={{ borderColor: isUserNameValidation ? '' : '#d82a20' }}
              isUserNameLabelAnimation={isUserNameLabelAnimation}
            >
              <label
                style={{
                  cursor: 'text',
                  color: isUserNameValidation ? '' : '#d82a20',
                }}
                htmlFor="inputUserName"
                className="isUserNameLabelAnimation"
              >
                사용자 이름
              </label>
              <Input
                required="required"
                id="inputUserName"
                type="text"
                value={userNameInputValue}
                onChange={(e) => {
                  setUserNameInputValue(e.target.value);
                }}
                onFocus={() => {
                  setIsUserNameLabelAnimation(true);
                }}
                onBlur={() => {
                  if (!userNameInputValue) {
                    setIsUserNameLabelAnimation(false);
                    setIsUserNameValidation(false);
                  } else {
                    setIsUserNameValidation(true);
                  }
                }}
              ></Input>
            </InputBox>
            <AlertMsgWrap>
              <AlertMsg type="alert">
                {isUserNameValidation ? '' : '사용자 이름을 입력하세요'}
              </AlertMsg>
            </AlertMsgWrap>
          </InputWrap>
          <InputWrap>
            <InputBox
              style={{ borderColor: isPwValidation ? '' : '#d82a20' }}
              isPwLabelAnimation={isPwLabelAnimation}
            >
              <label
                style={{
                  cursor: 'text',
                  color: isPwValidation ? '' : '#d82a20',
                }}
                htmlFor="inputPw"
                className="isPwLabelAnimation"
              >
                비밀번호
              </label>
              <Input
                placeholder={
                  isPwLabelAnimation ? '숫자를 포함한 영어 대소문자 8~20' : ''
                }
                required="required"
                autoComplete="on"
                id="inputPw"
                type="password"
                value={pwInputValue}
                onChange={(e) => {
                  setPwInputValue(e.target.value);
                }}
                onFocus={() => {
                  setIsPwLabelAnimation(true);
                }}
                onBlur={() => {
                  if (!pwInputValue) {
                    setIsPwLabelAnimation(false);
                    setIsPwValidation(false);
                  } else {
                    setIsPwValidation(PwReg.test(pwInputValue));
                  }
                }}
              ></Input>
            </InputBox>
            <AlertMsgWrap>
              <AlertMsg type="alert">
                {isPwValidation ? '' : '유효하지 않은 비밀번호 형식입니다'}
              </AlertMsg>
            </AlertMsgWrap>
          </InputWrap>
          <ButtonWrap>
            <Button
              onClick={() => {
                if (!idInputValue) {
                  setIsIdValidation(false);
                }

                if (!pwInputValue) {
                  setIsPwValidation(false);
                }

                if (!userNameInputValue) {
                  setIsUserNameValidation(false);
                }
              }}
            >
              회원가입
            </Button>
          </ButtonWrap>
        </form>
        <div style={{ marginTop: '24px' }}>
          <AlertMsg
            type="forgotPw"
            onClick={() => {
              navigate('/login');
            }}
          >
            이미 계정이 있으신가요?
          </AlertMsg>
        </div>
      </LoginBox>
    </Layout>
  );
}

export default Register;
const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;
const AlertMsgWrap = styled.div`
  margin-top: 8px;
  margin-left: 12px;
  height: 8px;
  display: flex;
  justify-content: space-between;
`;
const AlertMsg = styled.span`
  font-size: 0.8rem;
  font-size: ${(props) => (props.type === 'alert' ? '0.8rem' : '0.9rem')};
  color: ${(props) => {
    if (props.type === 'alert') return '#d82a20';
    if (props.type === 'forgotPw') return 'gray';
    return '#5F6368';
  }};
  text-decoration: ${(props) => (props.type === 'forgotPw' ? 'underline' : '')};

  font-weight: ${(props) => (props.type === 'forgotPw' ? '700' : '')};
  cursor: ${(props) => (props.type === 'forgotPw' ? 'pointer' : '')};
  &:hover {
    opacity: ${(props) => {
      if (props.type === 'forgotPw') return '0.8';
    }};
  }
`;
const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
  height: 48px;
`;
const InputWrap = styled.div`
  margin-top: 36px;
`;

const Button = styled.button`
  background-color: black;
  padding: 12px 0;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 8px;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    font-size: 15.7px;
    width: 99%;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 94%;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0px 8px;
  &::placeholder {
    font-size: 0.8rem;
  }
`;
const InputBox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  border: 1px solid;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  .isIdLabelAnimation {
    position: absolute;
    background-color: white;
    padding: 0px 2px;
    left: 8px;
    transition: transform 0.3s, font-size 0.2s;
    font-size: ${(props) => (props.isIdLabelAnimation ? '0.8rem' : '0.9rem')};
    transform: ${(props) =>
      props.isIdLabelAnimation ? 'translateY(-18px) translateX(-4px)' : ''};
  }
  .isPwLabelAnimation {
    position: absolute;
    background-color: white;
    padding: 0px 2px;
    left: 8px;
    transition: transform 0.3s, font-size 0.2s;
    font-size: ${(props) => (props.isPwLabelAnimation ? '0.8rem' : '0.9rem')};
    transform: ${(props) =>
      props.isPwLabelAnimation ? 'translateY(-18px) translateX(-4px)' : ''};
  }
  .isUserNameLabelAnimation {
    position: absolute;
    background-color: white;
    padding: 0px 2px;
    left: 8px;
    transition: transform 0.3s, font-size 0.2s;
    font-size: ${(props) =>
      props.isUserNameLabelAnimation ? '0.8rem' : '0.9rem'};
    transform: ${(props) =>
      props.isUserNameLabelAnimation
        ? 'translateY(-18px) translateX(-4px)'
        : ''};
  }
`;
const Layout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
const LoginBox = styled.div`
  min-height: 10vh;

  width: ${(props) => (props.isPageRendering ? '30%' : '70%')};
  border: 1px solid;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 48px 36px;
  opacity: ${(props) => (props.isPageRendering ? '1' : '0')};

  min-width: 380px;
  transform: ${(props) =>
    props.isPageRendering ? 'translateY(00vh)' : 'translateY(-70vh)'};

  transition: transform 0.4s, width 0.4s, opacity 0.7s;
  @media screen and (max-width: 500px) {
    border: none;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;

  font-weight: 700;
`;
