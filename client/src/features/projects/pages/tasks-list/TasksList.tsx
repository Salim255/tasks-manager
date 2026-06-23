import { useTasksSelector } from "../../states/taskSelectors";
import "./_tasks-list.scss";
import { TaskListItem } from "./components/task-list-item/TaskListItem";
import { TasksListHeader } from "./components/tasks-list-header/TasksListHeader";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
    ScatterChart,
    Scatter,
    Treemap ,
    FunnelChart,
    Funnel,
    LabelList,
    Legend ,
    RadialBar,
    RadialBarChart, AreaChart, Area , BarChart, Bar, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis , PolarRadiusAxis, Radar} from "recharts";
import { Group, Panel, Separator } from "react-resizable-panels";

import { ResponsivePie } from '@nivo/pie'
import JiraDemo from "./JiraDemo";

export const TasksList = () => {
    const { tasks } = useTasksSelector();
     return <JiraDemo />
      {/* <div className="tasks-list">
        <TasksListHeader/>
        {
            tasks.map((task) => {
                 return  <TaskListItem key={task.id} task={task}/> 
            })
        }        
    </div>  */}
      const data = [
  { name: "Jan", uv: 400, pv: 240, amt: 240 },
  { name: "Feb", uv: 300, pv: 139, amt: 221 },
  { name: "Mar", uv: 200, pv: 980, amt: 229 },
  { name: "Apr", uv: 278, pv: 390, amt: 200 },
  { name: "May", uv: 189, pv: 480, amt: 218 },
  { name: "Jun", uv: 239, pv: 380, amt: 250 },
];
    const data2 = [
  { name: "Bug", uv: 400,  },
  { name: "Story", uv: 300,},
  { name: "Task",  uv: 1180, },
];

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

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd"];

    return (
    <>
        <div>
            <LineChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="uv" stroke="#3b82f6" strokeWidth={2} />
  </LineChart>
        </div>

        <div>

             <AreaChart width={500} height={300} data={data}>
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="uv" stroke="#3b82f6" fill="url(#colorUv)" />
  </AreaChart>
        </div>

        <BarChart width={500} height={300} data={data2}>
      <CartesianGrid strokeDasharray="1" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />

      {/* First bar */}
      <Bar dataKey="pv" fill="#2563eb" />

      {/* Second bar */}
      <Bar dataKey="uv" fill="#16a34a" />

      {/* Third bar */}
      <Bar dataKey="amt" fill="#9333ea" />
    </BarChart>

        <div>
             <ComposedChart width={500} height={300} data={data}>
    <CartesianGrid stroke="#f5f5f5" />

    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="amt" fill="#93c5fd" stroke="#60a5fa" />
    <Bar dataKey="pv" barSize={20} fill="#3b82f6" />
    <Line type="monotone" dataKey="uv" stroke="#1e40af" />
  </ComposedChart>
        </div>

        <div>
              <PieChart width={400} height={300}>
    <Pie data={data} dataKey="uv" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
      {data.map((_, i) => (
        <Cell key={i} fill={COLORS[i % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
        </div>

        <div>
              <RadarChart cx={250} cy={150} outerRadius={120} width={500} height={300} data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey="name" />
    <PolarRadiusAxis />
    <Radar name="UV" dataKey="uv" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
  </RadarChart>
        </div>

       {/*  <div>
              <RadialBarChart width={400} height={300} cx={200} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
    <RadialBar minAngle={15} background clockWise dataKey="uv" fill="#3b82f6" />
    <Legend />
  </RadialBarChart>
        </div> */}

        <div>
             <ScatterChart width={500} height={300}>
    <CartesianGrid />
    <XAxis dataKey="uv" />
    <YAxis dataKey="pv" />
    <Tooltip />
    <Scatter data={data} fill="#3b82f6" />
  </ScatterChart>
        </div>

        <div>
              <Treemap width={500} height={300} data={data} dataKey="uv" stroke="#fff" fill="#3b82f6" />
        </div>

        <div>
             <FunnelChart width={400} height={300}>
    <Funnel dataKey="uv" data={data} fill="#3b82f6">
      <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
    </Funnel>
  </FunnelChart>
        </div>

        <div>
             <LineChart width={120} height={40} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#3b82f6" strokeWidth={2} dot={false} />
  </LineChart>
        </div>


        <div>
       
    <Group>
      <Panel defaultSize={20}>Sidebar</Panel>
      <Separator />
      <Panel defaultSize={80}>Main</Panel>
    </Group>

        </div> 
        <div 
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
      
    </>
  );
}