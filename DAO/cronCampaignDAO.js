const db = require("../db/db_info");

// 가장 최근 end_date 구하기 (and end_date = now())
function selectCampaignDAO(){
    return new Promise((resolve, reject) => {
        const d = new Date();
        const sql = `select end_date from campaign
        where start_date <= "${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" and "${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" <= end_date and end_date = "${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}"
        order by end_date limit 1;`;
        db.query(sql, (error, db_data) => {
            if(error){
                reject("DB ERR");
            }
            resolve(db_data);
        })
    })
}

// 캠페인 참여 중인 user_id 구하기
function selectUser_idDAO(end_date){
    return new Promise((resolve, reject) => {
        const d = new Date();
        const sql = `select uc.user_id from campaign c
        left join user_campaign uc on uc.campaign_id = c.campaign_id
        where start_date <= "${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" and "${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" <= end_date and end_date = "${end_date}";`;
        db.query(sql, (error, db_data) => {
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