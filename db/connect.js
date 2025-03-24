import mongoose from "mongoose";

export const connectToDb = async (connectionURI) => {
  try {
    mongoose.connect(connectionURI);
  } catch (err) {
    throw err;
  } finally {
    mongoose.connection.close();
  }
};
