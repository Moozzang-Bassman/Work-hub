import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
function Login() {
  const [isIdLabelAnimation, setIsIdLabelAnimation] = useState(false);
  const [isPwLabelAnimation, setIsPwLabelAnimation] = useState(false);
  const [isPageRendering, setIsPageRendering] = useState(false);
  const [idInputValue, setIdInputValue] = useState('');
  const [pwInputValue, setPwInputValue] = useState('');
  const [isIdValidation, setIsIdValidation] = useState(true);
  const [isPwValidation, setIsPwValidation] = useState(true);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['id']);

  useEffect(() => {
    setTimeout(() => {
      setIsPageRendering(true);
    }, 10);

    if (cookies.id === 'undefined') {
      return;
    } else {
      navigate('/workspace');
    }
  }, []);
  const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}|\.[a-z]{2,3}\.[a-z]{2,3}/;

  const loginSubmitHandler = async () => {
    if (isIdValidation && isPwValidation) {
      console.log('회원가입 유효성 테스트 완료');
      console.log(process.env.REACT_APP_SERVER_URL);
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, {
          email: idInputValue,
          password: pwInputValue,
        })
        .then((response) => {
          setCookie('id', response.headers.authorization);
          console.log('로그인 성공');
          navigate('/workspace');
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data?.message === 'wrong password') {
            setIsPwValidation(false);
          }
          if (error.response.data?.message === 'unregister user') {
            setIsIdValidation(false);
          }
        });
    }
  };

  return (
    <Layout>
      <LoginBox isPageRendering={isPageRendering}>
        <TitleWrap>
          <Title>로그인</Title>
          <StP>이메일과 비밀번호를 입력해주세요!</StP>
        </TitleWrap>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            loginSubmitHandler();
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
                {isIdValidation ? '' : '유효하지 않은 메일 주소입니다'}
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
                    setIsPwValidation(true);
                  }
                }}
              ></Input>
            </InputBox>
            <AlertMsgWrap>
              <AlertMsg type="alert">
                {isPwValidation ? '' : '잘못된 비밀번호입니다'}
              </AlertMsg>
              <AlertMsg type="forgotPw">비밀번호를 잊으셨나요?</AlertMsg>
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
              }}
            >
              로그인
            </Button>
          </ButtonWrap>
        </form>
        <div style={{ marginTop: '24px' }}>
          <AlertMsg>계정이 아직 없으신가요? </AlertMsg>
          <AlertMsg
            type="forgotPw"
            onClick={() => {
              navigate('/register');
            }}
          >
            계정만들기
          </AlertMsg>
        </div>
      </LoginBox>
    </Layout>
  );
}

export default Login;
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
    font-size: ${(props) => (props.isIdLabelAnimation ? '0.8rem' : '1rem')};
    transform: ${(props) =>
      props.isIdLabelAnimation ? 'translateY(-18px) translateX(-4px)' : ''};
  }
  .isPwLabelAnimation {
    position: absolute;
    background-color: white;
    padding: 0px 2px;
    left: 8px;
    transition: transform 0.3s, font-size 0.2s;
    font-size: ${(props) => (props.isPwLabelAnimation ? '0.8rem' : '1rem')};
    transform: ${(props) =>
      props.isPwLabelAnimation ? 'translateY(-18px) translateX(-4px)' : ''};
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
const StP = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #757575;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;

  font-weight: 700;
`;
