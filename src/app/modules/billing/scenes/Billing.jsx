import React, { Component } from 'react'
import { connect } from 'react-redux'

import { payRequest } from '../actions/billingActions'

import './Billing.scss'

class Billing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      stripeLoading: true,
    }
    // onAddCreditCard must be bound or else clicking on button will produce error.
    this.onAddCreditCard = this.onAddCreditCard.bind(this)
    // binding loadStripe as a best practice, not doing so does not seem to cause error.
    this.loadStripe = this.loadStripe.bind(this)
  }

  componentDidMount() {
    const email = this.props.currentUser.get('email')
    const amount = 3500
    this.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: 'pk_test_q06vFFvFw8E35B6uqvYpqR6t',
        image: 'https://s3-us-west-2.amazonaws.com/pros-storage-service/mwtlogo.png',
        locale: 'auto',
        email,
        amount,
        token: (token) => {
          console.log('token:: ', token)
          const data = token
          data.amount = amount
          this.props.payRequest(data)
        },
      })

      this.setState({
        stripeLoading: false,
        // loading needs to be explicitly set false so component will render in 'loaded' state.
        loading: false,
      })
    })
  }

  componentWillUnmount() {
    if (this.stripeHandler) {
      this.stripeHandler.close()
    }
  }

  loadStripe(onload) {
    if (!window.StripeCheckout) {
      const script = document.createElement('script')
      script.onload = () => onload()
      script.src = 'https://checkout.stripe.com/checkout.js'
      document.head.appendChild(script)
    } else {
      onload()
    }
  }

  onAddCreditCard(e) {
    this.stripeHandler.open({
      name: 'MyWalkThru',
      description: 'Property Management',
      panelLabel: 'Add Credit Card',
      allowRememberMe: false,
    })
    if (e) {
      e.preventDefault()
    }
  }

  render() {
    return (
      <div className="billing-page">
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary" onClick={this.onAddCreditCard}>
              Pay with Stripe
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.tenant.get('isLoading'),
  currentUser: state.currentUser.get('data'),
})

const mapDispatchToProps = dispatch => ({
  payRequest: payload => dispatch(payRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing)
