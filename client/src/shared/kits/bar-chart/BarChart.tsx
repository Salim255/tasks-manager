import "./_bar-chart.scss";
import { ResponsiveBar } from "@nivo/bar";

type BarChartItem = {
  label: string;
  value: number;
  color: string;
};

type BarChartProps = {
  data: BarChartItem[];
};

export const BarChart = ({ data }: BarChartProps) => {
  return <div className="bar-char">
    <ResponsiveBar
      data={data}
      keys={[
        "value"
      ]}
      indexBy="label"
      colors={({ data }) => data.color}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      labelSkipWidth={12}
      labelSkipHeight={12}   
      padding={0.65}
      labelTextColor="var(--grey-50)"
      
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "var(--grey-600)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-semibold)",
            },
          },
        },
        labels: {
          text: {
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-semibold)",
          },
        },
      }}
      axisLeft={null}
    />
  </div>
}