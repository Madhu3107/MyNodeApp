import 'reflect-metadata';
import { container } from 'tsyringe';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/mydb_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(() => {
  container.clearInstances();
  mongoose.models = {};
  mongoose.modelSchemas = {};
});
