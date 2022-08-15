"use strict";

const db = require("../db/db_info");

function imageCampaignDAO(target){
    return new Promise(function(resolve, reject){
        const sql = `select ci.campaign_image_id, c.title, ci.campaign_img from campaign_image ci
        left join user_campaign uc on uc.user_campaign_id = ci.user_campaign_id
        left join campaign c on c.campaign_id = uc.campaign_id
        where uc.user_id = ${target};`;
        db.query(sql, function(error, db_data){
            if(error){
                reject("DB ERR");
            }
            resolve(db_data);
        })
    })
}

function uploadCampaignDAO(target, user_id){
    return new Promise(function(resolve, reject){
        const sql = `insert into user_campaign(user_id, campaign_id)
        values(${user_id}, ${target});`;
        const sql2 = `select user_campaign_id from user_campaign uc
        where user_id = ${user_id} and campaign_id = ${target};`;
        db.query(sql + sql2, function(error, db_data){
            if(error){
                reject("DB ERR");
            }
            resolve(db_data);
        })
    })
}

module.exports = {
    imageCampaignDAO,
    uploadCampaignDAO
};