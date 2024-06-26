import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Flight } from "../../interface/Tracking";
import axios from "axios";
import SearchedList from "./SearchedList";
import { useSetRecoilState } from "recoil";
import { headerSelectedState } from "../../recoil/atom";
import { BASE_URL } from "../../common/constant";

const Tracking = () => {
  const AIRPORT_LIST = {
    "ICN(인천)": "INCHEON",
    "DAD(다낭)": "DA_NANG",
    // "PUS(김해)": "GIMHAE",
    // "KIX(오사카)": "OSAKA",
    // "PEK(베이징)": "BEIJING",
    // "PVG(상하이)": "SHANGHAI",
    // "JFK(뉴욕)": "NEW_YORK",
    // "HKG(홍콩)": "HONG_KONG",
    // "TPE(타이페이)": "TAIPEI",
    // "LAX(로스앤젤레스)": "LOS_ANGELES",
    // "SIN(싱가포르)": "SINGAPORE",
    // "BKK(방콕)": "BANGKOK",
  };

  const AIRLINE_LIST = [
    "비엣젯항공",
    "티웨이항공",
    "이스타항공",
    "한에어",
    "에어서울",
    "진에어",
    "제주항공",
    "아시아나항공",
    "대한항공",
    "베트남항공",
    "Apg Distribution System",
    "Flexflights Aps",
  ];

  const [searchedFlights, setSearchedFlights] = useState<Flight[]>([]);
  const setHeaderSelected = useSetRecoilState(headerSelectedState);

  useEffect(() => {
    setHeaderSelected("tracking");
  }, []);
  const handleSearch = () => {
    const { departureAirport, arriveAirport, airline, time, date } =
      selectedValue;
    console.log("출발지:", departureAirport);
    console.log("도착지:", arriveAirport);
    console.log("항공사:", airline);
    console.log("출발 시각:", time);
    console.log("출발 날짜:", date);

    if (departureAirport == "" || arriveAirport == "") {
      alert("출발지와 도착지를 선택 해 주세요!");
      return;
    } else if (date == "") {
      alert("출발 날짜를 선택 해 주세요!");
      return;
    }

    const queryParams: Record<string, string> = {};
    if (departureAirport)
      queryParams.departureCity = AIRPORT_LIST[departureAirport];
    if (arriveAirport) queryParams.arriveCity = AIRPORT_LIST[arriveAirport];
    if (airline) queryParams.airline = airline;
    if (time) queryParams.departureTime = time;
    if (date) queryParams.departureDate = date;

    axios
      .get(BASE_URL +"api/flightInfos", {
        params: queryParams,
      })
      .then((response) => {
        // API에서 반환된 데이터를 상태에 업데이트합니다.
        setSearchedFlights(response.data.data.flightInfoSearchResponseList);
        console.log(response.data.data.flightInfoSearchResponseList);
      })
      .catch((error) => {
        console.error("Error fetching searched flights:", error);
      });
  };

  // 드롭다운 상태를 객체로 관리
  const [showDropdown, setShowDropdown] = useState({
    departureAirport: false,
    arriveAirport: false,
    airline: false,
    time: false,
    date: false,
  });

  // 선택된 값들 관리
  const [selectedValue, setSelectedValue] = useState({
    departureAirport: "",
    arriveAirport: "",
    airline: "",
    time: "",
    date: "",
  });

  // 드롭다운 상태를 토글하는 함수
  const toggleDropdown = (dropdown) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  // 선택된 항목이 변경되었을 때 실행되는 함수
  const handleOptionChange = (dropdown, value) => {
    setSelectedValue((prevState) => ({
      ...prevState,
      [dropdown]: value,
    }));
    setShowDropdown({
      departureAirport: false,
      arriveAirport: false,
      airline: false,
      time: false,
      date: false,
    });
  };
  const handleDateChange = (event) => {
    setSelectedValue((prevState) => ({
      ...prevState,
      date: event.target.value,
    }));
  };

  const handleTimeChange = (event) => {
    setSelectedValue((prevState) => ({
      ...prevState,
      time: event.target.value,
    }));
  };

  return (
    <TrackingLayout>
      <TrackingTitle>
        원하는 항공권의 가격 변동 추이를 검색 해 보세요!
      </TrackingTitle>
      <SearchingTitle>항공권 검색</SearchingTitle>
      <SearchingContainer>
        {/* 출발지 검색 박스 */}
        <DropdownBox>
          <DropdownButton onClick={() => toggleDropdown("departureAirport")}>
            <DropdownTitle>출발지</DropdownTitle>
            <DropdownSubtitle>
              {selectedValue.departureAirport
                ? selectedValue.departureAirport
                : "출발지를 선택 해 주세요"}
            </DropdownSubtitle>
          </DropdownButton>
          <DropdownContent show={showDropdown.departureAirport}>
            {Object.entries(AIRPORT_LIST).map(([code], index) => (
              <DropdownItem
                key={index}
                onClick={() => handleOptionChange("departureAirport", code)}
              >
                {code}
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownBox>

        {/* 도착지 검색 박스 */}
        <DropdownBox>
          <DropdownButton onClick={() => toggleDropdown("arriveAirport")}>
            <DropdownTitle>도착지</DropdownTitle>
            <DropdownSubtitle>
              {selectedValue.arriveAirport
                ? selectedValue.arriveAirport
                : "도착지를 선택 해 주세요"}
            </DropdownSubtitle>
          </DropdownButton>
          <DropdownContent show={showDropdown.arriveAirport}>
            {Object.entries(AIRPORT_LIST).map(([code], index) => (
              <DropdownItem
                key={index}
                onClick={() => handleOptionChange("arriveAirport", code)}
              >
                {code}
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownBox>

        {/* 항공사 검색 박스 */}
        <DropdownBox>
          <DropdownButton onClick={() => toggleDropdown("airline")}>
            <DropdownTitle>항공사</DropdownTitle>
            <DropdownSubtitle>
              {selectedValue.airline
                ? selectedValue.airline
                : "항공사를 선택 해 주세요"}
            </DropdownSubtitle>
          </DropdownButton>
          <DropdownContent show={showDropdown.airline}>
            {AIRLINE_LIST.map((code, index) => (
              <DropdownItem
                key={index}
                onClick={() => handleOptionChange("airline", code)}
              >
                {code}
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownBox>

        {/* 출발 날짜 검색 박스 */}
        <DropdownBox>
          <DropdownDiv>
            <DropdownTitle>출발 날짜</DropdownTitle>
            <DateBox
              type="date"
              onChange={handleDateChange}
              value={selectedValue.date}
            ></DateBox>
          </DropdownDiv>
        </DropdownBox>
        {/* 출발 시각 검색 박스 */}
        <DropdownBox>
          <DropdownDiv>
            <DropdownTitle>출발 시각</DropdownTitle>
            <DateBox
              type="time"
              placeholder="HH:MM"
              onChange={handleTimeChange}
              value={selectedValue.time}
            ></DateBox>
          </DropdownDiv>
        </DropdownBox>
      </SearchingContainer>
      <SearchButton onClick={handleSearch}> 검색하기 →</SearchButton>

      <SearchedList searchedFlights={searchedFlights}></SearchedList>
    </TrackingLayout>
  );
};
const TrackingTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  text-align: center;

  padding: 40px 0;

  color: #000000;
`;
const TrackingLayout = styled.div`
  width: 122.4rem;
  margin: auto;
`;
const SearchingTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const SearchingContainer = styled.div`
  display: flex;
  gap: 10px;

  border-radius: 5px;
  /* background-color: #ececec; */
  padding: 20px 0;
`;

const DropdownBox = styled.div`
  position: relative;
  display: inline-block;
  width: 220px;
`;

const DropdownButton = styled.button`
  background-color: #7a95f5;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-radius: 4px;

  &:hover {
    background-color: #4f73f7;
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownContent = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
  animation: ${(props) => (props.show ? fadeInDown : "none")} 0.3s ease-in-out;
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 14px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const DropdownTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 600;
`;
const DropdownSubtitle = styled.div`
  font-size: 16px;
  color: #dcdada;
`;

//출발날짜, 출발시각

const DropdownDiv = styled.div`
  background-color: #7a95f5;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-radius: 4px;

  &:hover {
    background-color: #4f73f7;
  }
`;

//달력
const DateBox = styled.input`
  background-color: #9ca6cb;
  width: 100%;
  border: none;
  text-decoration: underline;
  background: transparent;
  /* outline: none; */
  cursor: pointer;

  &::placeholder {
    color: #fff; /* 기본 텍스트 색상 */
    font-style: italic; /* 기본 텍스트 스타일 */
  }

  /* 입력된 텍스트 스타일 */
  &:not(:placeholder-shown) {
    color: #dcdada; /* 입력된 텍스트 색상 */
    font-weight: 500; /* 입력된 텍스트 스타일 */
    font-size: 16px;
  }
`;

//검색 버튼
const SearchButton = styled.button`
  display: block;
  background-color: #4f73f7;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 140px;
  border-radius: 4px;
  margin: 10px 0 10px auto;

  &:hover {
    background-color: #7a95f5;
  }
`;
export default Tracking;
