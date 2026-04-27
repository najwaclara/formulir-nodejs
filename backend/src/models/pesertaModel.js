const pool = require('../config/db');
const getAllPeserta = async () => {
 const query = `
 SELECT
 ps.id,
 ps.nama,
 ps.tempatlahir,
 ps.tanggallahir,
 ps.agama,
 ps.alamat,
 ps.telpon,
 ps.jk,
 ps.hobi,
 ps.foto,
 ps.kabkot_id,
 k.nama_kabkot AS nama_kabkot,
 pr.nama_provinsi AS nama_provinsi
 FROM peserta ps
 LEFT JOIN kabkot k ON ps.kabkot_id = k.id
 LEFT JOIN provinsi pr ON k.provinsi_id = pr.id
 ORDER BY ps.id ASC
 `;
 const result = await pool.query(query);
 return result.rows;
};
const getPesertaById = async (id) => {
 const query = `
 SELECT
 ps.id,
 ps.nama,
 ps.tempatlahir,
 ps.tanggallahir,
 ps.agama,
 ps.alamat,
 ps.telpon,
 ps.jk,
 ps.hobi,
 ps.foto,
 ps.kabkot_id,
 k.nama_kabkot AS nama_kabkot,
 pr.nama_provinsi AS nama_provinsi
 FROM peserta ps
 LEFT JOIN kabkot k ON ps.kabkot_id = k.id
 LEFT JOIN provinsi pr ON k.provinsi_id = pr.id
 WHERE ps.id = $1
 `;
 const result = await pool.query(query, [id]);
 return result.rows[0];
};
const createPeserta = async (data) => {
 const {
 nama, tempatlahir, tanggallahir,
 agama, alamat, telepon, jk, hobi, foto, idkabko
 } = data;
 const query = `
 INSERT INTO peserta
 (nama, tempatlahir, tanggallahir, agama, alamat, telpon, jk, hobi, foto, kabkot_id)
 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
 RETURNING *
 `;
 const values = [
 nama, tempatlahir, tanggallahir,
 agama, alamat, telepon, jk, hobi, foto, idkabko
 ];
 const result = await pool.query(query, values);
 return result.rows[0];
};
const updatePeserta = async (id, data) => {
 const {
 nama, tempatlahir, tanggallahir,
 agama, alamat, telepon, jk, hobi, foto, idkabko
 } = data;
 const query = `
 UPDATE peserta SET
 nama = $1,
 tempatlahir = $2,
 tanggallahir = $3,
 agama = $4,
 alamat = $5,
 telpon = $6,
 jk = $7,
 hobi = $8,
 foto = $9,
 kabkot_id = $10
 WHERE id = $11
 RETURNING *
 `;
 const values = [
 nama, tempatlahir, tanggallahir,
 agama, alamat, telepon, jk, hobi, foto, idkabko, id
 ];
 const result = await pool.query(query, values);
 return result.rows[0];
};
const deletePeserta = async (id) => {
 const result = await pool.query(
 'DELETE FROM peserta WHERE id = $1 RETURNING *',
 [id]
 );
 return result.rows[0];
};
module.exports = {
 getAllPeserta,
 getPesertaById,
 createPeserta,
 updatePeserta,
 deletePeserta,
};