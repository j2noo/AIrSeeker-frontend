import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
``;

import logoSrc from "/assets/images/airseeker-logo.svg";
import starSrc from "/assets/images/star.svg";
import { headerSelectedState, loginInfoState } from "../../recoil/atom";
import { useEffect } from "react";

const Header = () => {
  const headerSelectedIndex = useRecoilValue(headerSelectedState);
  const navigate = useNavigate();
  const loginInfo = useRecoilValue(loginInfoState);

  useEffect(() => {}, [loginInfo]);
  console.log(loginInfo);
  return (
    <>
      <Spacer />
      <HeaderLayout>
        <HeaderContentContainer>
          <HeaderContainer>
            <Link to={"/"}>
              <Logo src={logoSrc} />
            </Link>
            <HeaderItem
              $isSelected={headerSelectedIndex === "tracking"}
              onClick={() => navigate("/tracking")}
            >
              <HeaderStar src={starSrc} />
              항공권 가격 변동 추적
            </HeaderItem>
            <HeaderItem
              $isSelected={headerSelectedIndex === "find"}
              onClick={() => navigate("/find")}
            >
              <HeaderStar src={starSrc} />
              항공권 최저가 탐색
            </HeaderItem>
          </HeaderContainer>
          {loginInfo.isLogin ? (
            <HeaderItem>{loginInfo.data?.name}님</HeaderItem>
          ) : (
            <HeaderItem
              $isSelected={headerSelectedIndex === "find"}
              // onClick={handleClick}
            >
              <HeaderStar src={starSrc} />
              {/* <Link to={"http://3.34.127.138:8080/oauth2/authorization/kakao"}> */}
              <Link to={"http://localhost:8080/oauth2/authorization/kakao"}>
                카카오 로그인
              </Link>
            </HeaderItem>
          )}
        </HeaderContentContainer>
      </HeaderLayout>
    </>
  );
};
export default Header;

const Spacer = styled.div`
  height: 8.2rem;
`;
const HeaderLayout = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.4);
  /* border-bottom: 1px solid ${(props) => props.theme.colors.gray10}; */
  backdrop-filter: blur(8px);

  width: 100%;
  height: 8.2rem;
  display: flex;
  z-index: 999;
`;
const HeaderContentContainer = styled.div`
  width: 122.4rem;
  height: 100%;
  margin: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
`;
const Logo = styled.img`
  width: 20.3rem;
  height: 4.2rem;
  cursor: pointer;
  margin-right: 3rem;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 5rem;
`;
const HeaderItem = styled.button<{ $isSelected?: boolean }>`
  color: ${(props) => props.theme.colors.gray80};
  ${(props) =>
    props.$isSelected ? props.theme.fonts.subtitleM : props.theme.fonts.bodyM};

  color: ${(props) =>
    props.$isSelected
      ? props.theme.colors.primary60
      : props.theme.colors.gray80};

  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;

  &:hover {
    transition: 0.2s;
    ${(props) => props.theme.fonts.subtitleM};
    color: ${(props) => props.theme.colors.primary60};

    img {
      display: block;
    }
  }

  padding: 1.2rem 0.8rem;
  > img {
    display: ${(props) => props.$isSelected && "block"};
    opacity: 1;
    transition: opacity 0.2s ease;
  }
`;

const HeaderStar = styled.img`
  width: 2rem;
  height: 2rem;

  position: absolute;
  left: -1.8rem;
  display: none;
`;
