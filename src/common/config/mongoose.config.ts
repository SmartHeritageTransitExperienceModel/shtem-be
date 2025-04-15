import mongoose from 'mongoose';

export const configureMongoose = () => {
  mongoose
    .set('toJSON', {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    })
    .set('toObject', {
      virtuals: true,
      versionKey: false,
    });

  mongoose.set('strictQuery', true);
};
