import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterBox>
        <FooterImage
          src={'/assets/images/airseeker-logo.svg'}
          alt={'logo'}
        />
        <FooterBottom>
          <div>
            <ul>
              <li>
                <span>서비스명</span> AirSeeker
              </li>
              <li>
                <span>소속</span> 세종대학교 컴퓨터공학과
              </li>
              <li>
                <span>팀</span> AirSeeker
              </li>
              <li>
                <span>이메일</span> wlsdndml213@naver.com
              </li>
            </ul>
          </div>
          <div>
            <ul>
              
              <li>
                <span>개발</span>
                <p>
                  <div>박진우 | Frontend, Backend </div>
                  <div>이유재 | Backend, Infra</div>
                  <div>김연우 | AI</div>
                </p>
              </li>
              
            </ul>
          </div>
        </FooterBottom>
      </FooterBox>
    </FooterContainer>
  );
};
export default Footer;

const FooterContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary10};
  padding: 4rem 0;
  z-index: 3;
`;

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 0 auto;
  max-width: 122.4rem;
`;

const FooterImage = styled.img`
  width: 20rem;
  height: 4.2rem;
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 30rem;

  ${(props) => props.theme.fonts.bodyM};
  color: ${(props) => props.theme.colors.gray50};

  li {
    margin-bottom: 0.1rem;
    display: flex;
  }

  span {
    display: inline-block;
    margin-right: 3rem;
    width: 6rem;
  }
`;
