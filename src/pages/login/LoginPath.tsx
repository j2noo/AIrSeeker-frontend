import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginInfoState } from "../../recoil/atom";
import { LoginInfo } from "../../interface/Login";

const LoginPath = () => {
  console.log("loginpath");
  const navigate = useNavigate();
  const setLoginInfo = useSetRecoilState(loginInfoState);

  useEffect(() => {
    // URL에서 access_token 및 refresh_token 추출
    function getUrlParams(url) {
      const params = {};
      const urlParts = url.split("?");
      if (urlParts.length > 1) {
        const queryParams = urlParts[1].split("&");
        queryParams.forEach((param) => {
          const [key, value] = param.split("=");
          params[key] = decodeURIComponent(value);
        });
      }
      return params;
    }

    const currentUrl = window.location.href;
    const params = getUrlParams(currentUrl);
    const accessToken = params["access_token"];
    const refreshToken = params["refresh_token"];

    console.log("AccessToken", accessToken);
    console.log("RefreshToken", refreshToken);

    // API 호출
    // fetch("http://3.34.127.138:8080/api/user", {
    fetch("http://localhost:8080/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fa2iled to fetch 2data");
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          console.log("content type : ", contentType);
          console.log(response);
          throw new Error("Received non-JSON response");
        }
      })
      .then((data) => {
        console.log("여기가찌2");
        // API 호출 성공 시 데이터 처리
        console.log("API Response:", data);
        const successLoginInfo: LoginInfo = {
          isLogin: true,
          data: {
            name: data.data.name,
            accessToken: accessToken,
            refreshToken: refreshToken,
            userId: data.data.userId,
          },
        };
        setLoginInfo(successLoginInfo);
        navigate("/");
      })
      .catch((error) => {
        // API 호출 실패 시 에러 처리
        console.error("API Error:", error);
      });

    // 로그인 후 리다이렉션 이후에 다른 페이지로 이동하거나 홈 페이지로 리디렉션할 수 있습니다.
    // history.push('/'); // 홈 페이지로 이동
  }, [navigate]);

  return <Layout>login...</Layout>;
};
export default LoginPath;

const Layout = styled.div`
  margin: 0 auto;
  /* max-width: 122.4rem; */
`;
