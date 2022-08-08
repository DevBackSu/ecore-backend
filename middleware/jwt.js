'use strict'

var jwt = require('jsonwebtoken');

function jwtCreate(userData){
  return new Promise(function (resolve, reject) {
      jwt.sign({
        USER_ID: userData.USER_ID,
        NAME: userData.NAME,
      }, process.env.JWT_SECRET, {
        expiresIn: '300d',
        issuer: 'ECORE',
      },function(err,token){
        if(err) reject(err)
        else resolve(token)
      });
  })
}
function jwtCerti(token){
  return new Promise(function (resolve, reject) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
          reject("토큰이 만료되었습니다.") // 토큰이 만료되었습니다.
        }
        if(decoded){
          console.log(decoded);
          resolve(decoded);
        }
        else{
          resolve("토큰이 존재하지 않습니다."); // 토큰이 존재하지 않습니다.
        }
      });
  })
}




module.exports = {
  jwtCreate,
  jwtCerti,
};