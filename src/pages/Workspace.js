import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faMagnifyingGlass,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Workspace() {
  const [isRightBoxOpen, setIsRightBoxOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isPageShow, setIsPageShow] = useState(false);
  const [cookies, removeCookie] = useCookies(['id']);
  const navigate = useNavigate();
  const statusBox = [
    '근무',
    '회의',
    '식사',
    '업무종료',
    '자리비움',
    '출장',
    '휴가',
  ];
  const SearchInputValueHandler = (e) => {
    setSearchInputValue(e.target.value);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsPageShow(true);
    }, 100);
  }, []);
  useEffect(() => {
    if (cookies.id === 'undefined') {
      navigate('/');
    }
  }, [cookies]);
  return (
    <LayOut isPageShow={isPageShow}>
      {/* width 변경 막기위해 Wrap으로 감쌈*/}

      <WorkspaceListBox>
        <Wrap>
          <Img imgSize="small"></Img>
        </Wrap>
      </WorkspaceListBox>
      <MainSpaceBox>
        <WorkspaceTitleBox>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Wrap>
              <Img imgSize="medium"></Img>
            </Wrap>
            <div style={{ marginLeft: '12px' }}>
              <Title>워크스페이스 이름</Title>
              <StP>워크스페이스 설명 들어갈것입니다</StP>
            </div>
          </div>
          <div
            style={{
              position: 'sticky',
              right: '0',
              left: '440px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '150px',
            }}
          >
            <Button>관리자 페이지</Button>
            <button
              onClick={() => {
                removeCookie('id');

                // 쿠키가 남아있어서 해놓음
                window.location.reload();
              }}
            >
              쿠키삭제
            </button>
          </div>
        </WorkspaceTitleBox>

        <StatusBoxContainer>
          {statusBox.map((status, index) => {
            return (
              <StatusBox
                key={index}
                className={status === '업무종료' ? 'bigBox' : ''}
              >
                <StatusTitleWrap>
                  <Title type="subTitle">{status}</Title>
                  <StP type="desc">
                    {status === '업무종료'
                      ? '업무를 종료한 멤버'
                      : `현재 ${status} 중인 멤버`}
                  </StP>
                </StatusTitleWrap>
                <StatusPeopleBox
                  className={status === '업무종료' ? 'bigBox' : ''}
                >
                  <Wrap>
                    <Img imgSize="small"></Img>
                  </Wrap>
                </StatusPeopleBox>
              </StatusBox>
            );
          })}
        </StatusBoxContainer>
      </MainSpaceBox>
      <RightBoxWrap showHide={isRightBoxOpen}>
        <RightBox>
          <RightBoxButtonWrap>
            <RightBoxButton
              style={{
                borderBottom: !isInboxOpen ? '2px solid #F89817' : '',
                color: !isInboxOpen ? '#F89817' : '',
              }}
              onClick={() => {
                setIsInboxOpen(false);
              }}
            >
              People
            </RightBoxButton>

            <RightBoxButton
              style={{
                borderBottom: isInboxOpen ? '2px solid #F89817' : '',
                color: isInboxOpen ? '#F89817' : '',
              }}
              onClick={() => {
                setIsInboxOpen(true);
              }}
            >
              Inbox
            </RightBoxButton>
          </RightBoxButtonWrap>
          <SearchInputWrap>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="sm"
              style={{ color: '#A5A5A5', marginRight: '4px' }}
            />

            <SearchInput
              placeholder="이름으로 검색"
              onChange={SearchInputValueHandler}
              value={searchInputValue}
            ></SearchInput>
            {searchInputValue ? (
              <FontAwesomeIcon
                onClick={() => {
                  setSearchInputValue('');
                }}
                icon={faCircleXmark}
                size="lg"
                style={{
                  color: '#A5A5A5',
                  marginLeft: '4px',
                  cursor: 'pointer',
                }}
              />
            ) : (
              // 움직임 방지 공갈 div
              <div
                style={{ width: '15px', height: '20px', marginLeft: '4px' }}
              ></div>
            )}
          </SearchInputWrap>
        </RightBox>
        <div
          onClick={() => {
            setIsRightBoxOpen(!isRightBoxOpen);
          }}
          className="toggleInbox"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="xl" />
        </div>
        <PeopleBoxContainer>
          {!isInboxOpen ? (
            <>
              <HoverEffectWrap>
                <PeopleBox>
                  <div style={{ display: 'flex' }}>
                    <Wrap>
                      <Img imgSize="small"></Img>
                    </Wrap>
                    <div style={{ marginLeft: '12px' }}>
                      <Title type="peopleName">마지막사람이름</Title>
                      <StP type="peopleJob">직업이름</StP>
                    </div>
                  </div>
                  <StatusDot></StatusDot>
                </PeopleBox>
              </HoverEffectWrap>
            </>
          ) : (
            <PeopleBox>
              <div style={{ display: 'flex' }}>
                <Wrap>
                  <Img imgSize="small"></Img>
                </Wrap>
                <div style={{ marginLeft: '12px' }}>
                  <Title type="peopleName">사람이름</Title>
                  <StP type="peopleJob">마지막채팅내용</StP>
                </div>
              </div>
            </PeopleBox>
          )}
        </PeopleBoxContainer>
        {/* 맨밑 박스임 */}
        <RightBottomBox>
          <Button>멤버 추가하기</Button>
        </RightBottomBox>
      </RightBoxWrap>
    </LayOut>
  );
}

export default Workspace;
const HoverEffectWrap = styled.div`
  border-radius: 8px;
  &:hover {
    background-color: #f5f5f5;
  }
`;
const StatusPeopleBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 12px 0;
  grid-gap: 12px;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const RightBottomBox = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  /* 백그라운드 컬러는 상태에따라 프롭스로.변경. */
  background-color: #34c759;
`;
const PeopleBoxContainer = styled.div`
  height: 100%;
  overflow: auto;
`;
const PeopleBox = styled.div`
  width: 100%;
  height: 68px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SearchInput = styled.input`
  width: 70%;
  border: none;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    font-size: 0.9rem;
  }
`;
const SearchInputWrap = styled.div`
  margin: 24px 0px;
  border-radius: 32px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 16px 4px rgba(0, 0, 0, 0.05);
`;
const StatusTitleWrap = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #e1e1e1;
`;
const RightBoxButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  height: 44px;
  gap: 24px;
  margin-top: 28px;
`;
const RightBoxButton = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0px 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const StatusBox = styled.div`
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0px 0px 16px 4px rgba(0, 0, 0, 0.05);
  padding: 16px;
  border-radius: 8px;

  /* @media screen and (min-width: 500px) { */
  min-height: 263px;
  /* } */
`;
const StatusBoxContainer = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 24px auto;
  display: grid;
  grid-template-columns: 1fr;
  .bigBox {
    grid-row: 2;
  }
  grid-gap: 14px;
  @media screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
    .bigBox {
      grid-column: 2;
      grid-row: 3/1;
    }
  }
  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
    .bigBox {
      grid-column: 3;
      grid-row: 1/4;
    }
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .bigBox {
      grid-column: 4;
      grid-row: 1/3;
      grid-auto-rows: max-content;
    }
  }
`;
const WorkspaceTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const StP = styled.p`
  color: #64676a;
  font-size: ${(props) =>
    props.type === 'desc' || props.type === 'peopleJob' ? '0.9rem' : '1rem'};
  margin: ${(props) => (props.type === 'peopleJob' ? '0px' : '4px 0px 0px')};
  /* white-space: nowrap; */
`;
const Title = styled.h2`
  font-size: ${(props) => {
    if (props.type === 'subTitle') return '1.2rem';
    if (props.type === 'peopleName') return '1rem';
    return '';
  }};
  margin: 0;
  /* letter-spacing: -0.2px; */
  font-weight: 500;
`;
const Wrap = styled.div``;
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
  border: 4px solid black;
  box-sizing: border-box;
`;
const RightBoxWrap = styled.div`
  box-sizing: border-box;
  position: fixed;
  right: 0;
  top: 0;
  padding: 68px 16px 0;
  width: 286px;
  height: 100%;
  transform: ${(props) =>
    props.showHide ? 'translateX(0)' : 'translateX(286px)'};
  transition: all 0.7s;

  box-shadow: 0 0 5px #dddddd;
  background-color: white;
  display: flex;
  flex-direction: column;
  .toggleInbox {
    width: 42px;
    height: 42px;
    position: absolute;
    right: 304px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    box-shadow: ${(props) => (!props.showHide ? '0px 0px 2px gray;' : '')};
    transform: ${(props) =>
      props.showHide ? 'translateX(64px) rotate(0.5turn)' : 'translateX(0px)'};

    transition-duration: 0.7s;
    top: 72px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 5px gray;
    }
  }
`;
const RightBox = styled.div`
  width: 100%;
`;
const MainSpaceBox = styled.div`
  margin: 24px auto 0;
  width: 80%;
  max-width: 1280px;
`;
const WorkspaceListBox = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 64px;
  box-shadow: 0px 0px 5px lightgray;
  display: flex;
  flex-direction: column;

  align-items: center;
  background-color: white;
  overflow-y: auto;
  padding-top: 78px;
  gap: 14px;

  @media screen and (max-width: 850px) {
    display: none;
  }
`;
const LayOut = styled.div`
  display: flex;
  margin-top: 64px;

  /* transform: translateX(000vw); */
  /* transform: ${(props) =>
    props.isPageShow ? 'translateY(00vw)' : 'translateY(100vw)'}; */
  opacity: ${(props) => (props.isPageShow ? 1 : 0)};
  transition: opacity 0.5s;
`;
