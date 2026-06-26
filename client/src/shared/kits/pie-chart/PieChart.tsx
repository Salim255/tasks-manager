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
        margin={{ top: 40, right: 40, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
       
        arcLinkLabelsThickness={4}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="white"
        />
}