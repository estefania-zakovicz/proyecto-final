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

async function insertConsejo(obj) {
    try {
        var query = "insert into consejos set ?";
        var rows = await pool.query(query, [obj])
        return rows;
    
    } catch (error) {
        console.log(error);
        throw error;
    } //cierra catch
} //cierra insert

async function getConsejoById(id) {
    var query = "select * from consejos where id=? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarConsejoById(obj, id) {
    try {
        var query = "update consejos set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
} //cierra modificar > update



module.exports = { getConsejos, deleteConsejosByTd , insertConsejo, getConsejoById, modificarConsejoById }