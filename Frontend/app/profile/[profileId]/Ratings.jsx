"use client";
import React, { useState } from 'react'
import { Card, Container,Grid,Box, Typography,styled,Table, TableHead, TableRow,TableCell,Tooltip,IconButton,  } from '@mui/material';
import { Gauge,gaugeClasses,} from '@mui/x-charts/Gauge';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { BarChart } from '@mui/x-charts/BarChart';

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

const data = [
  { value: 60, label: 'Promoter - 80 to 100%' },
  { value: 30, label: 'Passive - 60 to 79%' },
  { value: 10, label: 'Detractors 0 to 59%' },
];
function Ratings() {
    const [viewChart,setChart] = useState([{title:"Leadership View",value:98,color:"#52b202"},{title:"Team View",value:98, color:"#52b202"},{title:"Customer View",value:75,color:"#945efb"},{title:"Community View",value:50,color:"#f95edd"}])
    const [applied,setApplied] = useState([{title:"Attitude",value:80,color:"#945efb",help:"Lorem Ipson"},{title:"Performance",value:40,color:"#945efb",help:"Lorem Ipson"},{title:"Productivity",value:50,color:"#945efb",help:"Lorem Ipson"},{title:"Leadership",value:74,color:"#945efb",help:"Lorem Ipson"},{title:"Integrity",value:72,color:"#945efb",help:"Lorem Ipson"},{title:"Expertise",value:80,color:"#945efb",help:"Lorem Ipson"},{title:"Diversity",value:86,color:"#945efb",help:"Lorem Ipson"}])
    return (
    <main>
<Grid container spacing={2}>
    {viewChart.map((v,i)=><Grid item key={i} xs={12} md={3}>
    <Typography>{viewChart?.title}</Typography>
    <Box sx={{borderRadius:"10px",background:"#fff",padding:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <Typography>{v.title}</Typography>
    <Gauge value={v.value} height={200}  width={200} innerRadius="80%" outerRadius="100%"
     sx={(theme) => ({
      [`& .${gaugeClasses.valueText}`]: {
        fontSize: 26,
        transform: 'translate(0px, 0px)',
        
        },
      [`& .${gaugeClasses.valueText}`]: {
        fontSize: 40,
      },
      [`& .${gaugeClasses.valueArc}`]: {
        fill: v.color,
      },
      [`& .${gaugeClasses.referenceArc}`]: {
        fill: theme.palette.text.disabled,
      },
    })}
    text={
      ({ value, valueMax }) => `${value} %`
  }
    />
    </Box>
</Grid>)}
<Grid item xs={12} md={6}>
<Box sx={{display:"flex",justifyContent:"space-between",padding:"0px 10px"}}>
<Typography>Applied View</Typography> <Typography color="primary">Applied Score: 65%</Typography>
</Box>
<Card sx={{padding:"10px",borderRadius:"10px",width:"100%"}}> 
{/* <Table size="small" aria-label="company">
  <TableHead>
    {applied.map((a,i)=>  <TableRow hover key={i} sx={{ '&:last-child td, th': { border: 0 } }}>
  <TableCell padding="none" align="left" sx={{display:"flex",alignItems:"center"}}><Typography color="textSecondary" variant="subtitle2">{a?.title}</Typography> <Tooltip arrow title={a?.help}>
      <IconButton>
      <MdInfoOutline style={{color:"silver"}} />
      </IconButton>
    </Tooltip></TableCell>
  <TableCell align="left">{a?.value}</TableCell>
  </TableRow>)}
  </TableHead>
  </Table> */}
   <BarChart
      dataset={dataset}
      borderRadius={25}
      yAxis={[{ scaleType: 'band', dataKey: 'month'}]}
      series={[{ dataKey: 'score', label: 'Applied Score', valueFormatter }]} 
      layout="horizontal"
      {...chartSetting}
    />
</Card>
</Grid>
<Grid item xs={12} md={6}>
<Typography>NPS Chart</Typography> 
<Card sx={{padding:"10px",borderRadius:"10px",width:"100%",minHeight:"420px"}} className='center'> 
<PieChart
      series={[
        {
          data,
          arcLabel: (item) => `${item.value}%`,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      width={520}
      height={180}
    />
</Card>
</Grid>
</Grid>
    </main>
  )
}

const chartSetting = {
  xAxis: [
    {
      label: 'Percentage (%)',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    score: 21,
    month: 'Attitude',
  },
  {
    score: 28,
    month: 'Performance',
  },
  {
    score: 41,
    month: 'Productivity',
  },
  {
    score: 73,
    month: 'Leadership',
  },
  {
    score: 99,
    month: 'Integrity',
  },
  {
    score: 65,
    month: 'Expertise',
  },
  {
    score: 85,
    month: 'Diversity',
  },
  
];

const valueFormatter = (value) => `${value}%`;
export default Ratings