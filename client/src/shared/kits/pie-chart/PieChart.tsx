import { ResponsivePie } from '@nivo/pie'

export const PieChart = () => {


    const data3 = [
      {
        "id": "stylus",
        "label": "stylus",
        "value": 254,
        "color": "hsl(255, 70%, 50%)"
      },
      {
        "id": "c",
        "label": "c",
        "value": 295,
        "color": "hsl(354, 70%, 50%)"
      },
      {
        "id": "ruby",
        "label": "ruby",
        "value": 478,
        "color": "hsl(243, 70%, 50%)"
      },
      {
        "id": "erlang",
        "label": "erlang",
        "value": 33,
        "color": "hsl(89, 70%, 50%)"
      },
      {
        "id": "go",
        "label": "go",
        "value": 577,
        "color": "hsl(79, 70%, 50%)"
      }
    ]

    return <div 
        style={{
        width: "400px",
        height: "400px",
        margin: "40px auto",
      }}>
        <ResponsivePie /* or Pie for fixed dimensions */
        data={data3}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                symbolShape: 'circle'
            }
        ]}
        />
    </div>
}