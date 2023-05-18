import {Pie, PieChart, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAgeData} = props

  return (
    <div className="piechart-container">
      <h1 className="heading">Vaccination by Age</h1>

      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationByAgeData}
          outerRadius="60%"
          dataKey="count"
          cx="50%"
          cy="30%"
        >
          <Cell name="Male" fill="#2d87bb" />
          <Cell name="Female" fill="#a3df9f" />
          <Cell name="Others" fill="#64C2A6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
