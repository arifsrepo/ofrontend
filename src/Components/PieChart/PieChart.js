import React from 'react';
import { Chart } from "react-google-charts";

const PieChart = (props) => {

  console.log(props?.db1status);
  
    const data = [
        ["Memory", "Status"],
        ["Used", (props?.db1status?.totalSpace-props?.db1status?.availSpace)],
        ["Free", props?.db1status?.availSpace]
      ];
      
    const options = {
        pieHole: 0.5,
        is3D: false,
        legend: 'none',
        slices: {
          0: { color: '#3376DB' },
          1: { color: '#00798C' }  //FREE
        },
        animation: {
          startup: true,
          duration: 1500,
        }
      };

    return (
        <div>
            <Chart
                chartType="PieChart"
                width="100%"
                height="300px"
                data={data}
                options={options}
            />
        </div>
    );
};

export default PieChart;