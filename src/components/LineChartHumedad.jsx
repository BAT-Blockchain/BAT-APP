import { useEffect } from "react"
import { Chart } from "chart.js";
import styles from '@/src/app/styles/Home.module.css'

function Humedad(props) {
  useEffect(() => {
    let ctx = document.getElementById('myChart2').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: props.labels,
        datasets: [{
          data: props.data,
          label: "Humedad",
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
      <div className={styles.containerHumedad}>
        <div className={styles.ChartHumedad}>
          <canvas id='myChart2'></canvas>
        </div>
      </div>
    </>
  )
}

export default Humedad;