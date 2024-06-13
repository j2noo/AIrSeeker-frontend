import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { headerSelectedState, loginInfoState } from "../../recoil/atom";
import { useEffect, useState } from "react";
import { Flight } from "../../interface/Tracking";
import MyList from "./MyList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../common/constant";

const Find = () => {
  const setHeaderSelected = useSetRecoilState(headerSelectedState);
  const [likesFlight, setLikesFlight] = useState<Flight[]>([]);

  const loginInfo = useRecoilValue(loginInfoState);
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderSelected("find");

    if (!loginInfo.isLogin) {
      alert("로그인 후 이용 해 주세요!");
      navigate("/");
    }

    // API 호출
    axios
      .get(`${BASE_URL}api/flightInfos/user/2/like`)
      .then((response) => {
        // API 호출 성공 시 데이터를 likesFilght에 설정
        const likesData = response.data.data.flightInfoSearchResponseList;
        setLikesFlight(likesData);
      })
      .catch((error) => {
        // API 호출 실패 시 에러 처리
        console.error("Failed to fetch liked flights:", error);
      });
  }, []);

  return (
    <FindLayout>
      <TrackingTitle>내가 찜한 항공권 목록을 확인해보세요!</TrackingTitle>{" "}
      <MyList likesFlight={likesFlight}></MyList>
    </FindLayout>
  );
};
export default Find;

const FindLayout = styled.div`
  width: 122.4rem;
  margin: auto;
`;
const TrackingTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;

  margin: 50px 0;
`;
