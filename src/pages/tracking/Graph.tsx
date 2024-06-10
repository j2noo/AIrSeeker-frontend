import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import axios from "axios";

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

const Graph: React.FC<GraphProps> = ({ flightInfoId }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartDatas, setChartDatas] = useState<any>(chartData);

  useEffect(() => {
    // API를 호출하여 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://3.34.127.138:8080/api/flightPriceInfos/${flightInfoId}`
        );

        const data = response.data.data;

        //그래프 데이터 가공
        // const processedData = processData(data);
        setChartDatas(processData(data));
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
    console.log(prices, dates);

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
      },
      series: [
        {
          name: "가격",
          data: prices,
        },
      ],
    };

    console.log("chardatas ", chartData);
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
