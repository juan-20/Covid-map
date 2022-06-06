import Slider from '@mui/material/Slider';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

export const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
];

function App() {

  interface headers{
      headers:{
        apiKey: any
    }
  }

  const config: headers ={
    headers: {
      apiKey: import.meta.env.VITE_SUPABASE_KEY,
    }
  }

  const select = axios.get('https://mpahheesklcfvonnvpdf.supabase.co/rest/v1/covid_cases?select=location',
  config
  )
  .then(function (response){
    console.log(response)
  })

  return (
    <div className="App">
      <h1>Covid Daily Cases</h1>

      <Slider defaultValue={30} aria-label="Selecione a data" />

      <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="400px"
      data={data}
    />

    </div>
  )
}

export default App
