export default {
  jwt: {
    secret: process.env.SECRET || 'tenda-solar-2026', 
    expiresIn: '1h', 
  },
};