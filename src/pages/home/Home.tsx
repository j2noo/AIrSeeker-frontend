import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <BackgroundContainer>
        <TextContainer onClick={() => navigate("/tracking")}>
          AI를 이용한 항공권 가격 추적하러 가기 →
        </TextContainer>
        <TextContainer onClick={() => navigate("/tracking")}>
          항공권 최저가 탐색하러 가기 →
        </TextContainer>
      </BackgroundContainer>
      <div>
        Home;
        <div>로고</div>
      </div>
    </HomeLayout>
  );
};
export default Home;

const HomeLayout = styled.div`
  margin: 0 auto;
  /* max-width: 122.4rem; */
`;

const BackgroundContainer = styled.div`
  background-color: #f0f0f0;
  background-image: url("/assets/images/main-bg.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
`;

const TextContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
  cursor: pointer;

  width: 122.4rem;
  margin: auto;
`;
