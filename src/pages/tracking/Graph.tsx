import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import axios from "axios";
import { BASE_URL } from "../../common/constant";

interface GraphProps {
  flightInfoId: number;
}
interface PriceDataDto {
  flightPriceInfoResponseList: PriceData[];
}
interface PriceData {
  search_date: string;
  predictedPrice: number;
  flightInfoId: number;
}
const chartData = {
  options: {
    xaxis: {
      categories: [],
    },
  },
  series: [
    {
      name: "가격",
      data: [],
    },
  ],
};
// 예측 데이터를 추가하는 함수
const addPreditData = (data) => {
  const newData = [...data];
  const PREDICT_DATES = [
    "2024-06-10",
    "2024-06-11",
    "2024-06-12",
    "2024-06-13",
    "2024-06-14",
    "2024-06-15",
    "2024-06-16",
    "2024-06-17",
    "2024-06-18",
    "2024-06-19",
    "2024-06-20",
    "2024-06-21",
    "2024-06-22",
    "2024-06-23",
    "2024-06-24",
    "2024-06-25",
    "2024-06-26",
    "2024-06-27",
  ];
  const lastPredictedPrice = data[data.length - 1].predictedPrice;
  const flightInfoId = data[0].flightInfoId;

  let currentPrice = lastPredictedPrice;

  for (let i = 1; i <= 16; i++) {
    const currentDate = PREDICT_DATES[i];

    // 가격은 마지막 값에서 크게 벗어나지 않으면서 증가/감소 반복
    currentPrice += Math.random() * 10000 - 2000; // -500 ~ +500 범위의 변화
    currentPrice = Math.round(currentPrice);

    newData.push({
      search_date: currentDate,
      predictedPrice: currentPrice,
      flightInfoId: flightInfoId,
    });
  }

  return newData;
};

const Graph: React.FC<GraphProps> = ({ flightInfoId }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartDatas, setChartDatas] = useState<any>(chartData);

  useEffect(() => {
    // API를 호출하여 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}api/flightPriceInfos/${flightInfoId}`
        );

        const data = response.data.data;

        //그래프 데이터 가공
        // const processedData = processData(data);
        console.log("추가전", data);

        // 데이터에 예측 데이터 추가
        const addedDatas = addPreditData(data.flightPriceInfoResponseList);
        console.log("추가후", addedDatas);

        // setChartDatas(processData(data));
        setChartDatas(processData({ flightPriceInfoResponseList: addedDatas }));
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, [flightInfoId]);

  // 데이터를 그래프 형식에 맞게 가공하는 함수
  const processData = (data: PriceDataDto) => {
    const prices = data.flightPriceInfoResponseList.map(
      (item: PriceData) => item.predictedPrice
    );
    const dates = data.flightPriceInfoResponseList.map(
      (item: PriceData) =>
        item.search_date.substring(5, 7) +
        "/" +
        item.search_date.substring(8, 10)
    );
    // const halfIndex = Math.floor(prices.length / 2); // 데이터의 중간 인덱스를 찾음
    // const colors = prices.map((index) =>
    //   index < halfIndex ? "#2196F3" : "#FF0000"
    // );
    // console.log(prices, dates);

    // 그래프 데이터 객체 생성
    const chartData = {
      options: {
        chart: {
          type: "line",
        },
        xaxis: {
          categories: dates,
          labels: {
            show: true,
            rotate: -45, // 레이블이 겹치지 않게 회전
            rotateAlways: true,
            hideOverlappingLabels: true,
            showDuplicates: false,
          },
          tickAmount: Math.floor(dates.length / 3), // 총 레이블 개수를 dates.length / 3 만큼으로 제한
          title: {
            text: "항공권 가격 검색 날짜",
          },
        },
        yaxis: {
          title: {
            text: "가격",
          },
        },

        annotations: {
          xaxis: [
            {
              x: "06/" + new Date().getDate(),
              borderColor: "#f51000",
              label: {
                style: {
                  color: "#000000",
                  fontWeight: "700",
                },
                text: "Today",
              },
            },
          ],
        },
      },
      series: [
        {
          name: "가격",
          data: prices,
        },
      ],
    };

    // console.log("chardatas ", chartData);
    return chartData;
  };

  return (
    <GraphLayout>
      <GraphTitle>항공권 가격 변동 추이</GraphTitle>
      <Chart
        options={chartDatas.options}
        series={chartDatas.series}
        type="line"
        height={350}
      />
    </GraphLayout>
  );
};

export default Graph;

const GraphLayout = styled.div`
  margin: 20px 0;
`;
const GraphTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
