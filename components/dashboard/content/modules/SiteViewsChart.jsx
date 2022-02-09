import styles from "./Modules.module.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import { useEffect, useState } from "react"
import { getSiteViews } from "../../../../services/view.service"
import Loading from "../../../helpers/Loading"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
)

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]

export const options = {
  indexAxis: "x",
  plugins: {
    legend: {
      display: false,
    },
  },
}

const getViewsByMonth = async (monthsNumber = 4) => {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const usedMonths = []
  const views = []

  for (let i = monthsNumber; i >= 0; i -= 1) {
    if (i === 0) {
      const viewsCurrentMonth = await getSiteViews(currentMonth, currentYear)
      usedMonths.push(months[currentMonth - 1])
      views.push(viewsCurrentMonth)
    } else {
      if (currentMonth - i <= 0) {
        const viewsCurrentMonth = await getSiteViews(13 - i, currentYear - 1)
        usedMonths.push(months[13 - i])
        views.push(viewsCurrentMonth)
      } else {
        const viewsCurrentMonth = await getSiteViews(
          currentMonth - i,
          currentYear
        )
        usedMonths.push(months[currentMonth - i - 1])
        views.push(viewsCurrentMonth)
      }
    }
  }

  return {
    labels: usedMonths,
    datasets: [
      {
        data: views,
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 0,
      },
    ],
  }
}

const SiteViewsChart = () => {
  const [dataChart, setDataChart] = useState(null)

  useEffect(async () => {
    const data = await getViewsByMonth(4)
    setDataChart(data)
  }, [])

  return (
    <div className={styles.module}>
      <p className={styles.title}>
        Nombre total de <span>Vues</span> sur <span>Unicorn's</span>
      </p>
      {dataChart ? <Bar data={dataChart} options={options} /> : <Loading />}
    </div>
  )
}

export default SiteViewsChart
