import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import routerBalans from './routerBalans';
import router from './routes';

const app = express();
app.use(express.json());
app.use('/auth', router);
app.use(routerBalans);
const PORT = config.get<string>('port') || 3001;

const connect = async () => {
  try {
    await mongoose.connect(config.get<string>('dbUri'));
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`, 'ok'));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
export default connect;
