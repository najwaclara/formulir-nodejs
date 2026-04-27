const pool = require('../config/db');
const getAllKabko = async () => {
 const query = `
 SELECT
 k.id,
 k.nama_kabkot,
 k.provinsi_id,
 p.nama_provinsi AS nama_provinsi
 FROM kabkot k
 LEFT JOIN provinsi p ON k.provinsi_id = p.id
 ORDER BY k.id ASC
 `;
 const result = await pool.query(query);
 return result.rows;
};
const getKabkoById = async (id) => {
 const query = `
 SELECT
 k.id,
 k.nama_kabkot,
 k.provinsi_id,
 p.nama_provinsi AS nama_provinsi
 FROM kabkot k
 LEFT JOIN provinsi p ON k.provinsi_id = p.id
 WHERE k.id = $1
 `;
 const result = await pool.query(query, [id]);
 return result.rows[0];
};
const getKabkoByProvinsi = async (id_provinsi) => {
 const result = await pool.query(
 'SELECT * FROM kabkot WHERE provinsi_id = $1 ORDER BY nama_kabkot ASC',
 [id_provinsi]
 );
 return result.rows;
};
const createKabko = async (data) => {
 const { nama, id_provinsi } = data;
 const result = await pool.query(
 'INSERT INTO kabkot (nama_kabkot, provinsi_id) VALUES ($1, $2) RETURNING *',
 [nama, id_provinsi]
 );
 return result.rows[0];
};
const updateKabko = async (id, data) => {
 const { nama, id_provinsi } = data;
 const result = await pool.query(
 'UPDATE kabkot SET nama_kabkot = $1, provinsi_id = $2 WHERE id = $3 RETURNING *',
 [nama , id_provinsi, id]
 );
 return result.rows[0];
};
const deleteKabko = async (id) => {
 const result = await pool.query(
 'DELETE FROM kabkot WHERE id = $1 RETURNING *',
 [id]
 );
 return result.rows[0];
};
module.exports = {
 getAllKabko,
 getKabkoById,
 getKabkoByProvinsi,
 createKabko,
 updateKabko,
 deleteKabko,
};