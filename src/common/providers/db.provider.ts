import mongoose from 'mongoose';

export const dbConnection = async (uri: string) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Đã kết nối thành công: ${conn.connection.host}`);
  } catch (e) {
    console.error(`[MongoDB] Lỗi kết nối: ${e}`);
  }

  mongoose.connection.on('error', (e) => {
    console.error('[MongoDB] Lỗi sau khi kết nối:', e);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[MongoDB] Mất kết nối!');
  });
};
