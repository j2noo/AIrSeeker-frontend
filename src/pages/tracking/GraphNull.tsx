import styled from "styled-components";
import Chart from "react-apexcharts";

const dates = [
  "3/14",
  "3/15",
  "3/16",
  "3/17",
  "3/18",
  "3/19",
  "3/20",
  "3/21",
  "3/22",
  "3/23",
  "3/24",
  "3/25",
  "3/26",
  "3/27",
  "3/28",
  "3/29",
  "3/30",
  "3/31",
  "4/1",
  "4/2",
  "4/3",
  "4/4",
  "4/5",
  "4/6",
  "4/7",
  "4/8",
  "4/9",
  "4/10",
  "4/11",
  "4/12",
  "4/13",
  "4/14",
  "4/15",
  "4/16",
  "4/17",
];

const prices = [
  200000, 201000, 202000, 203000, 204000, 203500, 203000, 202500, 202000,
  202500, 203000, 203500, 204000, 204500, 205000, 205500, 206000, 206500,
  207000, 207500, 208000, 207500, 207000, 206500, 206000, 205500, 205000,
  204500, 204000, 203500, 203000, 202500, 202000, 202500, 203000, 203500,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chartDataDummy: any = {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GraphNull: React.FC<any> = () => {
  return (
    <GraphLayout>
      <GraphTitle>{"항공권 가격 변동 추이(예시)"}</GraphTitle>
      <Chart
        options={chartDataDummy.options}
        series={chartDataDummy.series}
        type="line"
        height={350}
      />
    </GraphLayout>
  );
};

export default GraphNull;

const GraphLayout = styled.div`
  margin: 20px 0;
`;
const GraphTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
