import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusViews = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusViews.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusViews.inProgress})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)

    if (response.ok) {
      const fetchedData = await response.json()
      const updateVaccinationData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }
      this.setState({
        vaccinationData: updateVaccinationData,
        apiStatus: apiStatusViews.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusViews.failure,
      })
    }
  }

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusViews.failure:
        return this.renderFailureView()
      case apiStatusViews.inProgress:
        return this.renderLoaderView()
      case apiStatusViews.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          last7DaysVaccinationData={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderData={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeData={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  render() {
    return (
      <div className="bg-container">
        <div className="icon-name-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="website-name">Co-Win</h1>
        </div>
        <h1 className="description">CoWIN Vaccination in India</h1>
        {this.renderResults()}
      </div>
    )
  }
}

export default CowinDashboard
