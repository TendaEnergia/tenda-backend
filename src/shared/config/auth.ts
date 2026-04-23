export default {
  jwt: {
    secret: process.env.APP_SECRET || 'tenda-solar-2026', 
    expiresIn: '1h', 
  },
};