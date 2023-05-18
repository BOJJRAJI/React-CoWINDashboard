import {ResponsiveContainer, Pie, PieChart, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderData} = props
  console.log(vaccinationByGenderData)
  return (
    <div className="piechart-container">
      <h1 className="heading">Vaccination by gender</h1>
      <ResponsiveContainer width="90%" height={300}>
        <PieChart>
          <Pie
            data={vaccinationByGenderData}
            startAngle={180}
            endAngle={0}
            innerRadius="30%"
            outerRadius="60%"
            dataKey="count"
            cx="50%"
            cy="60%"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="middle"
            align="center"
            wrapperStyle={{fontSize: 12, fontFamily: 'Roboto', paddingTop: 100}}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
