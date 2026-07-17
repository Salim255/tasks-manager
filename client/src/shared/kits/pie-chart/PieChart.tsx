import { ResponsivePie } from '@nivo/pie'
import "./_pie-chart.scss";


type PieChartItem = {
  id: string;
  label: string;
  value: number;
  color: string;
};

type PieChartProps = {
  data: PieChartItem[];
};


export const PieChart = ({ data }: PieChartProps) => {

    return <ResponsivePie
        data={data}
        colors={{ datum: "data.color" }}
        margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
        innerRadius={0.75}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
       
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="var(--grey-50)"

        theme={{
          labels: {
            text: {
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-semibold)",
              fill: "var(--grey-600)"
            },
          },
        }}
        />
}