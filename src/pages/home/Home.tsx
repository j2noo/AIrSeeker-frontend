import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { headerSelectedState } from "../../recoil/atom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const setHeaderSelected = useSetRecoilState(headerSelectedState);

  useEffect(() => {
    setHeaderSelected("none");
  }, []);
  return (
    <HomeLayout>
      <BackgroundContainer>
        <FlexContainer>
          <TextDetail>
            AI를 이용한 최저가 항공권 조회, <span>AirSeeker</span>
          </TextDetail>
          <TextContainer onClick={() => navigate("/tracking")}>
            항공권 가격 추적하러 가기 →
          </TextContainer>
          <TextContainer onClick={() => navigate("/find")}>
            내 항공권 목록 보기 →
          </TextContainer>
        </FlexContainer>
      </BackgroundContainer>
    </HomeLayout>
  );
};
export default Home;

const HomeLayout = styled.div`
  margin: 0 auto;
  /* max-width: 122.4rem; */
  /* position: absolute; */
  overflow-y: hidden;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0px;
  background-color: #f0f0f0;
  background-image: url("/assets/images/air.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  padding-top: 100px;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: content;
  /* float: left; */
  margin: 30px 150px;

  /* justify-content: center; */
  /* align-items: center; */
`;
const TextDetail = styled.div`
  font-size: 32px;
  font-weight: 700;
  padding: 20px;
  > span {
    color: #5872d1;
  }
`;
const TextContainer = styled.div`
  display: inline-block;
  position: relative; /* ::before 가상 요소 위치 설정을 위해 필요 */
  font-size: 24px;
  font-weight: 600;
  padding: 20px;
  cursor: pointer;

  border-radius: 25px; /* 약간의 경계선을 부드럽게 하기 위해 추가 */
  margin: 10px;
  overflow: hidden; /* 가상 요소가 컨테이너를 벗어나지 않도록 설정 */

  border: 2px solid black;
  border-radius: 15px; /* 약간의 경계선을 부드럽게 하기 위해 추가 */
  width: 320px;
  color: #000000f1;

  background-color: rgba(227, 238, 243, 0.197);


  /* 가상 요소 설정 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: rgba(224, 240, 248, 0.083);
    z-index: 0; /* 텍스트 뒤에 배치 */
    transition: width 0.1s linear; /* 애니메이션 설정 */
  }

  /* hover 상태에서 가상 요소 확장 */
  &:hover::before {
    width: 100%;
  }

  /* 텍스트가 가상 요소 위에 오도록 설정 */
  & > * {
    position: relative;
    z-index: 1;
  }
`;
