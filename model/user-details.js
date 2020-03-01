// Class
const Result = require('./result'); 

//third party packege
const geoIp = require('geoip-lite');
const countryLanguage = require('country-language');


/*
    ipClient = '217.182.175.75'; //Proxy
    ipClient = '104.248.140.7'; //VPN
    ipClient = '109.64.95.83'; //Real IP
    ipClient = req.header('x-forwarded-for');
*/



module.exports = class User {
    constructor(){
        this.resultObject = new Result();
        this.ipClient = 0;
        this.accept_language='';
        this.country='';
        this.time_zone='';
        this.fullCountry='';
        this.answer='';
        this.time ='';
    }

    setUpdateUserData(req){
        this.ipClient = req.header('x-forwarded-for');
        this.accept_language = req.header('accept-language');
        this.country = geoIp.lookup(this.ipClient)['country'];
        this.time_zone = geoIp.lookup(this.ipClient)['timezone'];
        this.fullCountry = countryLanguage.getCountry(this.country).name;
        this.resultObject = new Result();

    }

    setIp(ip){
        this.ipClient=ip;
    }
    setAcceptLanguage(acceptLanguage){
        this.accept_language = acceptLanguage;
    }

    setAnswer(answer){
        this.answer = answer;
    }

    setTime(time){
        this.time = time;
    }
    setRestResult(){
          this.resultObject = new Result();

    }


    getIp(ip){
        return this.ipClient;
    }
    getResultObject(){
        return this.resultObject;
    }
    getCountry(){
        return this.country;
    }
    getAcceptLanguage(){
        return this.accept_language;
    }
    getFullCountry(){
        return this.fullCountry;
    }

    getCountry(){
        return this.country;
    }

    getTimeZone(){
        return this.time_zone;
    }
    getAnswer(){
        return this.answer;
    }
    getTime(){
        return this.time;
    }
 
}