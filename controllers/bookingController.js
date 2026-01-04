/* eslint-disable no-unused-vars */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

// Create checkout session
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],

    // Success and cancel URLs
    success_url: `${req.protocol}://${req.get('host')}/my-Bookings`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,

    // Customer info
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,

    // Store custom data in metadata for webhook
    metadata: {
      tourId: req.params.tourId,
      userId: req.user.id
    },

    // Line items (products being purchased)
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100, // Amount in cents
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${
                tour.imageCover
              }`
            ]
          }
        }
      }
    ],
    mode: 'payment'
  });

  // 3) Send session to client
  res.status(200).json({
    status: 'success',
    session
  });
});

// Create booking after successful payment (called by webhook)
const createBookingCheckout = async session => {
  const tour = session.metadata.tourId;
  const user = session.metadata.userId;
  const price = session.amount_total / 100; // Convert from cents

  await Booking.create({ tour, user, price });
};

// stripe Webhook handler
exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};

// CRUD operations
exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
