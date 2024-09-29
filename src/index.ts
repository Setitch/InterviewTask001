import { app } from './app.js';

app.listen(3031, () => {
  console.log(app._router.stack[4]);
});
