"use strict";

const db = require("../db/db_info");

function registerBadge(user_id){
    return new Promise((resolve, reject) => {
        const sql = `insert into user_badge(user_id, badge_id)
        values(${user_id}, 3)`;
        db.query(sql, (err, db_data) => {
            if(err){
                reject("db err");
            }
            else{
                resolve(db_data);
            }
        })
    })
}

function oneChallengeBadge(){

}

function tenChallengeBadge(){
    
}

function oneDailyBadge(){}

function tenDailyBadge(){}

module.exports = {
    registerBadge,
    oneChallengeBadge,
    tenChallengeBadge,
    oneDailyBadge,
    tenDailyBadge,
}