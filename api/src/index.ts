import { app } from '~/app';
import { CONFIG } from './config';

app.listen(CONFIG.PORT, () =>
  // eslint-disable-next-line no-console
  console.log('Server is running on port', CONFIG.PORT)
);
