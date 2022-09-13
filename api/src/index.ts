import { app } from '~/app';
import { CONFIG } from '~/config';
import { sequelize } from '~/database';

app.listen(CONFIG.PORT, async () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port', CONFIG.PORT);
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
});
