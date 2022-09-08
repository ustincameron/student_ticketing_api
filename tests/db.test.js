import db from '../src/models/index.js';

const { Student } = db.db;

const truncateTables = async () => {
  await Student.destroy({ truncate: true, cascade: true });
};

const insertData = async data => {
  await Student.create(data, {
  });
};

export {
  truncateTables,
  insertData,
};
