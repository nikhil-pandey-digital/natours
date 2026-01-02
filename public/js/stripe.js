/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51SjL8KAOUwRKFgYw1PF5UawJHmWjlmzl8OVcoheEWqRiL69oVDvBUBueKZwN8hiqFUu9i4yWUSt7SPA2k1O8Qstx00K1TO3d2S'
);

export const bookTour = async tourId => {
  try {
    // 1) get checkout session from api
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Redirect to Stripe checkout
    await stripe
      .redirectToCheckout({
        sessionId: session.data.session.id
      });
      
  } catch (err) {
    console.error('Booking error:', err);
    showAlert('error', err.message || 'Something went wrong while booking the tour!');
  }
};
