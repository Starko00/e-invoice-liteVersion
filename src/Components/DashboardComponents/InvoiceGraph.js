import invoiceGraphStyle from "./invoiceGraphStyle.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as CharJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from "chart.js";
import {
  BsFillArchiveFill,
  BsFillCursorFill,
  BsFillInboxFill,
  BsFillSkipEndFill,
} from "react-icons/bs";

CharJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export const InvoiceGraph = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of invoices",
        data: [10, 32, 40, 50, 32,10, 32, 40],
        tension: 0.4,
        backgroundColor: "#387A3FB0",
        borderColor: "#387A3FB0",
      },
      {
        label: "Number of invoices",
        data: [15, 11, 30, 1, 31,40, 50, 32],
        tension: 0.4,
        backgroundColor: "#e28a52",
        borderColor: "#e28a52",
      },
      {
        label: "Number of invoices",
        data: [15, 11, 30, 1, 31,40, 50, 32].reverse(),
        tension: 0.4,
        backgroundColor: "#23367c",
        borderColor: "#23367c",
      },
    ],

  };
  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };
  const style = invoiceGraphStyle;
  return (
    <div className={style.container}>
      <div className={style.sortingContainer}>
        <div className={style.category}>
          <div className={style.categoryIcon}>
            {" "}
            <BsFillCursorFill />{" "}
          </div>
          <div className={style.categoryText}>
            Poslate: <span>830</span>
          </div>
        </div>

        <div className={style.category}>
          <div className={style.categoryIcon}>
            <BsFillInboxFill />
          </div>
          <div className={style.categoryText}>
            Poslate: <span>830</span>
          </div>
        </div>

        <div className={style.category}>
          <div className={style.categoryIcon}>
            <BsFillArchiveFill />
          </div>
          <div className={style.categoryText}>
            Poslate: <span>830</span>
          </div>
        </div>
      </div>
      <div className={style.graphHolder}>
        
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
};
