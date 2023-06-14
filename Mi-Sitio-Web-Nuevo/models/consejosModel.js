var pool = require('./bd');

/*sirve para listar los consejos */
async function getConsejos() {
    var query = 'select * from consejos';
    var rows = await pool.query(query);
    return rows;
}

async function deleteConsejosByTd(id) {
    var query = 'delete from consejos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}
module.exports = { getConsejos, deleteConsejosByTd }