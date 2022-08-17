const db = require("../db/db_info");

function cronTestDAO(){
    return new Promise((resolve, reject) => {
        const sql = `select * from badge;`;
        db.query(sql, (error, db_data) => {
            if(error){
                reject("DB ERR");
            }
            resolve(db_data);
        })
    })
}

module.exports = {
    cronTestDAO,
}