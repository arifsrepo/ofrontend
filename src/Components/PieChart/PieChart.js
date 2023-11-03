import React from 'react';
import { Chart } from "react-google-charts";

const PieChart = (props) => {
  let clr;
    if(props?.db1status?.totalSpace-props?.db1status?.availSpace > 450){
      clr = {color: '#dc3545'};
    } else {
      clr = {color: '#3376DB'};
    }

    const data = [
        ["Memory", "Status"],
        ["Used", (props?.db1status?.totalSpace-props?.db1status?.availSpace)],
        ["Free", 512-(props?.db1status?.totalSpace-props?.db1status?.availSpace)]
      ];
      
    const options = {
        pieHole: 0.5,
        is3D: false,
        legend: 'none',
        slices: {
          0: {color: '#00798C'},
          1: clr  //FREE
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