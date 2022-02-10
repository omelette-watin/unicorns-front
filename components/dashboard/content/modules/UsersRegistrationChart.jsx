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
import Loading from "../../../helpers/Loading"
import {countAllUser} from "../../../../services/user.service";

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

const getUsersRegistrationByMonth = async (monthsNumber = 4) => {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const usedMonths = []
  const newUsers = []

  for (let i = monthsNumber; i >= 0; i -= 1) {
    if (i === 0) {
      const newUsersCurrentMonth = await countAllUser(currentMonth, currentYear)
      usedMonths.push(months[currentMonth - 1])
      newUsers.push(newUsersCurrentMonth)
    } else {
      if (currentMonth - i <= 0) {
        const newUsersCurrentMonth = await countAllUser(13 - i, currentYear - 1)
        usedMonths.push(months[13 - i])
        newUsers.push(newUsersCurrentMonth)
      } else {
        const newUsersCurrentMonth = await countAllUser(
          currentMonth - i,
          currentYear
        )
        usedMonths.push(months[currentMonth - i - 1])
        newUsers.push(newUsersCurrentMonth)
      }
    }
  }

  return {
    labels: usedMonths,
    datasets: [
      {
        data: newUsers,
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

const UsersRegistrationChart = () => {
  const [dataChart, setDataChart] = useState(null)

  useEffect(async () => {
    const data = await getUsersRegistrationByMonth(4)
    setDataChart(data)
  }, [])
  return (
    <div className={styles.module}>
      <p className={styles.title}>
        Nombre total d'<span>Inscription</span> sur <span>Unicorn's</span>
      </p>
      {dataChart ? <Bar data={dataChart} options={options} /> : <Loading />}
    </div>
  );
};

export default UsersRegistrationChart;