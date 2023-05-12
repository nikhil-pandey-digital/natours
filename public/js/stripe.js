/* eslint-disable*/
import axios from 'axios';
const stripe = Stripe(
  'pk_test_51N5jTJSJDMHquHMyzuHYZSpxWE02mkHV1W3q1vNfumPZVPR7IfgnOgCraKT7wPumT5PBPfsAzmK4P4HfYOwXwoXI00ynTKOtHC'
);
import { showAlert } from './alerts';
import { errorMonitor } from 'nodemailer/lib/xoauth2';

export const bookTour = async tourId => {
  try {
    // 1) get checkout session from api
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    // console.log(session);

    // 2) create checkout form + charge credit card
    stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
