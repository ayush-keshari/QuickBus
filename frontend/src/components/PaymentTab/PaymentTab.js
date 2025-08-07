import React from 'react'
import Card from 'react-credit-cards'
import './PaymentTab.css'
import jwt_decode from 'jwt-decode'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from './utils'
import 'react-credit-cards/es/styles-compiled.css'

export default class PaymentTab extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: '',
    token: ''
  }

  componentDidMount() {
    const tok = sessionStorage.getItem('authToken')
    if (tok) {
      const decoded = jwt_decode(tok)
      this.setState({ token: decoded.user })
    }
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer })
    }
  }

  handleInputFocus = ({ target }) => {
    this.setState({ focused: target.name })
  }

  handleInputChange = ({ target }) => {
    if (target.name === 'number') target.value = formatCreditCardNumber(target.value)
    if (target.name === 'expiry') target.value = formatExpirationDate(target.value)
    if (target.name === 'cvc') target.value = formatCVC(target.value)
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { issuer } = this.state
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => ({ ...acc, [d.name]: d.value }), {})
    this.setState({ formData })
    this.form.reset()
  }

  moveToTicketPage = e => {
    e.preventDefault()
    localStorage.setItem('paymentData', JSON.stringify(this.state.token))
    window.location.href = '/getTicket'
  }

  renderNamesOfPassenger = () => {
    const passArray = localStorage.getItem('nameData')
    if (passArray) {
      const names = JSON.parse(passArray)
      return names.map((name, idx) => <div key={idx} className="usrName">{name}</div>)
    }
    return null
  }

  renderSeatNumbers = () => {
    const seatArray = localStorage.getItem('reservedSeats')
    if (seatArray) {
      const seats = JSON.parse(seatArray)
      return seats.map((seat, idx) => <div key={idx} className="usrName">{seat}</div>)
    }
    return null
  }

  getSumTotal = () => {
    let count = 0
    const tax = 150
    const seatArray = localStorage.getItem('reservedSeats')
    if (seatArray) {
      const seats = JSON.parse(seatArray)
      count = seats.length
      return (
        <div className="price-summary">
          <div>Ticket Price: {1000 * count}</div>
          <div>Tax: {tax}</div>
          <div>Total: {1000 * count + tax}</div>
        </div>
      )
    }
    return null
  }

  render() {
    const { name, number, expiry, cvc, focused, issuer } = this.state

    return (
      <div className="paym">
        <div className="row">

          {/* Left side - Payment Form */}
          <div className="App-payment cl-1">
            <h3>Enter Credit Card Details</h3>
            <Card number={number} name={name} expiry={expiry} cvc={cvc} focused={focused} callback={this.handleCallback} />

            <form className="credit-form" ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="tel" name="number" className="frm-ctrl" placeholder="Card Number" pattern="[\d| ]{16,22}" required onChange={this.handleInputChange} onFocus={this.handleInputFocus} />
              </div>
              <div className="form-group">
                <input type="text" name="name" className="frm-ctrl" placeholder="Name" required onChange={this.handleInputChange} onFocus={this.handleInputFocus} />
              </div>
              <div className="form-group">
                <input type="tel" name="expiry" className="frm-ctrl" placeholder="Valid Thru" pattern="\d\d/\d\d" required onChange={this.handleInputChange} onFocus={this.handleInputFocus} />
              </div>
              <div className="form-group">
                <input type="tel" name="cvc" className="frm-ctrl cvc" placeholder="CVC" pattern="\d{3,4}" required onChange={this.handleInputChange} onFocus={this.handleInputFocus} />
              </div>
              <input type="hidden" name="issuer" value={issuer} />
              <div>
                <button onClick={this.moveToTicketPage} className="btn btn-light btCustom">PAY</button>
              </div>
            </form>
          </div>

          {/* Right side - Booking Summary */}
          <div className="columnTwo">
            <h3>Unique Travels</h3>
            <h4>Booking Details</h4>

            <div className="row">
              <div className="col-6 pt">
                <div className="hdng">Username</div>
                <hr className="hr3" />
                <div className="hdng">Date</div>
                <div className="hdng">From</div>
                <div className="hdng">To</div>
                <hr className="hr3" />
                <div className="hdng">Passengers</div>
                {this.renderNamesOfPassenger()}
                <hr className="hr3" />
                <div className="hdng">Ticket Price</div>
                <div className="hdng">Tax</div>
                <div className="hdng">Total Sum</div>
              </div>

              <div className="col-6">
                <hr className="hr3" />
                <div className="usrName">{localStorage.getItem('date')}</div>
                <div className="usrName">{localStorage.getItem('start')}</div>
                <div className="usrName">{localStorage.getItem('destination')}</div>
                <hr className="hr3" />
                <div className="hdng">Seat No</div>
                {this.renderSeatNumbers()}
                {this.getSumTotal()}
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
