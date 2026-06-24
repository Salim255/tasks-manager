import { ResponsivePie } from '@nivo/pie'
import "./_pie-chart.scss";

export const PieChart = () => {


    const data3 = [
      {
        "id": "In Progress",
        "label": "In Progress",
        "value": 254,
        "color": "hsl(24, 95%, 48%)"
      },
      {
        "id": "Done",
        "label": "Done",
        "value": 295,
        "color": "hsl(148, 48%, 49%)"
      },
      {
        "id": "To Do",
        "label": "TO DO",
        "value": 478,
        "color": "hsl(243, 70%, 50%)"
      }
    ]

    return <ResponsivePie
        data={data3}
        colors={{ datum: "data.color" }}
        margin={{ top: 40, right: 40, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#144f8e"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['brighter', 10]] }}
        />
}