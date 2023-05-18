import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccinationData} = props

  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="barchar-container">
      <h1 className="heading">Vaccination Coverage</h1>
      <ResponsiveContainer width={900} height={400}>
        <BarChart
          data={last7DaysVaccinationData}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#6c757d',
              strokeWidth: 1,
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Roboto',
              color: '#6c757d',
            }}
          />
          <YAxis
            tickFormatter={dataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0.5,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: 20,
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Roboto',
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#5a8dee"
            radius={[10, 10, 0, 0]}
            barSize="20%"
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            radius={[5, 5, 0, 0]}
            barSize="20%"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
