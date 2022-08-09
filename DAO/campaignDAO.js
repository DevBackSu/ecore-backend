"use strict";

const db = require("../db/db_info");

function campaignDAO(){
  return new Promise(function(resolve, reject){
    const sql = `SELECT campaign_id ,title, start_date, end_date, detail, poster_img, campaign_reward from campaign c ;`;
    db.query(sql, function(error, db_data){
      if(error){
        reject("DB ERR");
      }
      resolve(db_data);
    })
  })
}

function campaignotherDAO(campaign_id){
  return new Promise(function(resolve, reject){
    const sql = `select ci.campaign_image_id, ci.campaign_img from campaign_image ci
    left join user_campaign uc on uc.user_campaign_id = ci.user_campaign_id 
    left join campaign c on uc.campaign_id = c.campaign_id
  where c.campaign_id = ${campaign_id};`;
    db.query(sql, function(error, db_data){
      if(error){
        reject("DB ERR");
      }
      resolve(db_data);
    })
  })
}

module.exports = {
  campaignDAO,
  campaignotherDAO
  };