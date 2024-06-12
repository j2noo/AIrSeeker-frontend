import styled from "styled-components";
import { Flight } from "../../interface/Tracking";
import { useState } from "react";
import Graph from "../tracking/Graph";
import GraphNull from "../tracking/GraphNull";

interface SearchedListProps {
  likesFlight: Flight[];
}

const MyList: React.FC<SearchedListProps> = ({ likesFlight }) => {
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [flightInfoId, setFlightInfoId] = useState<number>(0);
  const handleFlightSelect = (index: number, flightInfoId: number) => {
    setSelectedFlight(index);
    setFlightInfoId(flightInfoId);
  };

  return (
    <SearchedLayout>
      <SearchingTitle>항공권 선택</SearchingTitle>
      <SearchedListContainer>
        {likesFlight.length === 0 ? (
          <NoList>찜한 항공권이 없습니다!</NoList>
        ) : (
          <>
            <SearchedListItem isSelected={false}>
              <div>출발지</div>
              <div>도착지</div>
              <div>출발 날짜</div>
              <div>항공사</div>
              <div>비행 시간</div>
            </SearchedListItem>
            {likesFlight.map((flight, index) => (
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
export default MyList;

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
