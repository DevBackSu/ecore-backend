const db = require("../db/db_info");

// 어제 날짜에 끝난 end_date의 캠페인 가져오기
function selectCampaignDAO(day){
    return new Promise((resolve, reject) => {
        const sql = `SELECT c.campaign_reward, uc.user_id  FROM campaign c LEFT JOIN user_campaign uc ON uc.campaign_id = c.campaign_id  WHERE end_date = "${day}";`;
        var res_data = [];
        db.query(sql, (error, db_data) => {
            if(error){
                console.log(error);
                reject("DB ERR");
            }
            db_data.forEach((element)=>{
                res_data.push([element.campaign_reward, element.user_id]);
            })
            resolve(res_data);
        })
    })
}

// 캠페인 참여 중인 user_id 구하기
function selectUser_idDAO(info){
    return new Promise((resolve, reject) => {
        var mysql = require("mysql");
        var querys = "";
        const query = "UPDATE user u SET u.total_score = u.total_score+? WHERE u.user_id = ?;"
        info.forEach((element)=>{
            querys += mysql.format(query,element);
        })
        db.query(querys, (error, db_data) => {
            if(error){
                reject("DB ERR");
            }
            resolve(db_data);
        })
    })
}

// update
function cronCampaignDAO(user_id){
    return new Promise((resolve, reject) => {
        const d = new Date();
        const sql = `update user u set total_score = total_score + (select c.campaign_reward  from campaign c
            left join user_campaign uc on uc.campaign_id = c.campaign_id
            left join user u on u.user_id = uc.user_id
            where c.start_date <= "${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" and "${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" <= c.end_date
            order by end_date limit 1)
            where u.user_id = ${user_id};`;
        db.query(sql, (error, db_data) => {
            if(error){
                reject("DB ERR");
            }
            resolve(db_data);
        })
    })
}

module.exports = {
    selectCampaignDAO,
    cronCampaignDAO,
    selectUser_idDAO
}