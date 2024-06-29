var whitelist;
if (process.env.NODE_ENV === 'production') {
  // whitelist = [
  //   'http://ghinote.com',
  //   'https://ghinote.com',
  //   'http://192.168.31.251:4444',
  // ];
  whitelist = '*';
} else {
  whitelist = '*';
}
export const corsCustom = {
  origin: async function (origin, callback) {
    if (whitelist === '*') {
      callback(null, true);
    } else {
      if (whitelist.indexOf(origin) !== -1) {
        console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  allowedHeaders: [
    'Origin',
    'Access-Control-Allow-Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
    'Headers',
  ],
  exposedHeaders: ['set-cookie'],
  maxAge: 1728000,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  // preflightContinue: false,
  credentials: true,
};
