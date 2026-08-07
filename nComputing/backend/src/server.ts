import app from './app';
import { env } from './config/env';

const PORT = parseInt(env.PORT, 10) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===================================================`);
  console.log(`  NComputing B2B Backend Server running on port ${PORT}`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  Frontend URL config: ${env.FRONTEND_URL}`);
  console.log(`===================================================`);
});
