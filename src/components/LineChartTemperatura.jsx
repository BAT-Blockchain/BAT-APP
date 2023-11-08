"use client"
import { useEffect } from "react"
import { Chart } from "chart.js";
import styles from '@/src/app/styles/Home.module.css'

function Temperatura(props) {
  useEffect(() => {
    let ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: props.labels,
        datasets: [{
          data: props.data,
          label: "Temperatura",
          borderColor: "rgb(95, 221, 168)",
          backgroundColor: "rgb(95, 221, 168)",
          fill: false,
        }
        ]
      }
    });
  }, [])
  return (
    <>
      {/* line chart */}
      <div className={styles.containerTemperatura}>
        <div className={styles.ChartTemperatura}>
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  )
}

export default Temperatura;