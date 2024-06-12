import styled from "styled-components";
import Chart from "react-apexcharts";

const dates = [
  "5/23",
  "5/24",
  "5/25",
  "5/26",
  "5/27",
  "5/28",
  "5/29",
  "5/30",
  "5/31",
  "6/1",
  "6/2",
  "6/3",
  "6/4",
  "6/5",
  "6/6",
  "6/7",
  "6/8",
  "6/9",
  "6/10",
  "6/11",
  "6/12",
  "6/13",
  "6/14",
  "6/15",
  "6/16",
  "6/17",
  "6/18",
  "6/19",
  "6/20",
  "6/21",
  "6/22",
  "6/23",
  "6/24",
  "6/25",
  "6/26",
  "6/27",
];

const prices = [
  200000, 201000, 202200, 203000, 204000, 203500, 204000, 202500, 202000,
  202500, 203000, 203500, 204000, 204500, 205000, 205500, 206000, 206500,
  208000, 207500, 208000, 208600, 208600, 208200, 207900, 209500, 209400,
  209900, 210000, 210500, 210600, 210900, 210900, 210800, 211000, 212000,
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
      tickAmount: 12,
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
          x: "6/" + new Date().getDate(),
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
