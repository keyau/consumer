import { registerAs } from "@nestjs/config";

export default registerAs('mongo', () => ({
  uri: process.env.MONGODB_URI || 'mongodb://defaultUser:password@localhost:27017/consumer'
}));