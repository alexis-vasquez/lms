import { sequelize } from '@database';
import { app } from '~/app';
import { CONFIG } from '~/config';

import './database/models';

const main = async () => {
  try {
    await sequelize.sync();
    // eslint-disable-next-line no-console
    console.log('Connection to database has been established successfully.');
    app.listen(CONFIG.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${CONFIG.PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
};

main();
