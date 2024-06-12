import styled from "styled-components";
import { Flight } from "../../interface/Tracking";
import { useState } from "react";
import Graph from "./Graph";
import GraphNull from "./GraphNull";
import axios from "axios";

interface SearchedListProps {
  searchedFlights: Flight[];
}

const SearchedList: React.FC<SearchedListProps> = ({ searchedFlights }) => {
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [flightInfoId, setFlightInfoId] = useState<number>(0);
  const handleFlightSelect = (index: number, flightInfoId: number) => {
    setSelectedFlight(index);
    setFlightInfoId(flightInfoId);
  };
  const handleLike = async (flightInfoId: number) => {
    try {
      const response = await axios.post("http://3.34.127.138:8080/api/likes", {
        userId: 2,
        flightInfoId: flightInfoId,
      });
      if (response.status === 200) {
        alert("찜하기 성공!");
      }
    } catch (error) {
      console.error("찜하기 실패:", error);
      alert("찜하기 실패!");
    }
  };
  return (
    <SearchedLayout>
      <SearchingTitle>항공권 선택</SearchingTitle>
      <SearchedListContainer>
        {searchedFlights.length === 0 ? (
          <NoList>검색 결과가 없습니다!</NoList>
        ) : (
          <>
            <SearchedListItem isSelected={false}>
              <div>출발지</div>
              <div>도착지</div>
              <div>출발 날짜</div>
              <div>항공사</div>
              <div>비행 시간</div>
              <div>찜</div>
            </SearchedListItem>
            {searchedFlights.map((flight, index) => (
              <SearchedListItem
                key={index}
                isSelected={selectedFlight === index}
                onClick={() => handleFlightSelect(index, +flight.flightInfoId)}
              >
                <div>{flight.route.departureAirport.city}</div>
                <div>{flight.route.arriveAirport.city}</div>
                <div>{flight.departureDate}</div>
                <div>{flight.airline}</div>
                <div>
                  {flight.departureTime.substring(0, 5)} ~
                  {flight.arriveTime.substring(0, 5)}
                </div>
                <Heart onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트 전파 방지
                  handleLike(+flight.flightInfoId);
                }}></Heart>
              </SearchedListItem>
            ))}
          </>
        )}
      </SearchedListContainer>
      {flightInfoId ? (
        <Graph flightInfoId={flightInfoId}></Graph>
      ) : (
        <GraphNull></GraphNull>
      )}
    </SearchedLayout>
  );
};
export default SearchedList;

const SearchedLayout = styled.div``;
const SearchingTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const SearchedListContainer = styled.div`
  /* height: 300px; */
  width: 100%;
  overflow-y: scroll;
  padding-right: 10px;
  margin: 20px 0 50px 0;

  /* border: 2px solid #636363; */
  > div:first-child {
    font-weight: 700;
    cursor: default; /* 기본 커서 스타일 설정 */
  }

  > div:first-child ~ div:hover {
    background-color: #cfdbfa; /* 첫 번째 div의 다음 형제 div에만 호버 스타일 적용 */
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    border-radius: 6px;
    /* background: ${(props) => props.theme.colors.gray20}; */
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary40};
    border-radius: 6px;
  }
`;

const SearchedListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  gap: 10px;
  font-size: 18px;
  padding: 20px 0;
  border-bottom: 2px solid #636363;

  background-color: ${(props) => (props.isSelected ? "#6b88f1" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  div {
    width: 190px;
  }
  div:nth-child(6) {
    width: 30px; // 원하는 크기로 설정
    height: 30px; // 원하는 크기로 설정
  }
`;
const NoList = styled.div`
  /* border: 1px solid black;
  border-radius: 5px; */
  text-align: center;
  font-size: 15px;
  font-weight: 500;
`;
const Heart = styled.div`
  width: 30px;
  height: 30px;
  background-image: url("assets/images/line100.png");
  background-size: cover;
  transition: background-image 0.2s ease;

  &:hover {
    background-image: url("assets/images/fill100.png");
  }
`;
