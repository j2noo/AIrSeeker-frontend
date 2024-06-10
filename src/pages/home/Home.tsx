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
          <TextContainer onClick={() => navigate("/tracking")}>
            AI를 이용한 항공권 가격 추적하러 가기 →
          </TextContainer>
          <TextContainer onClick={() => navigate("/tracking")}>
            항공권 최저가 탐색하러 가기 →
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
  float: left;
  margin: 50px 100px;

  /* justify-content: center; */
  /* align-items: center; */
`;

const TextContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
  cursor: pointer;

  text-decoration: underline;
  text-underline-offset: 5px;

  margin: 10px;
`;
