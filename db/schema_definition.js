// SCHEMA
let schema = {
  // bookings for week starting with dec 2 (monday)
  bookings_12_02: [
    {
      date: "12/02/2024",
      time: "4:00 PM",
      court: "Dolores"
    }, {
      date: "12/05/2024",
      time: "3:30 PM",
      court: "Dolores"
    }
  ],

  // default bookings for the week if there are no overrides
  default_week_bookings: {
    "email@gmail.com": [
      'monday', 'wednesday', 'saturday'
    ]
  },
  future_booking_01052025: {
    date: "01/05/2025",
    time: "3:30 PM",
    court: "Dolores"
  },

  // valid access token
  "user@gmail.com": {
    refresh_token: "2313jdd0j3d23d",
  }

}
