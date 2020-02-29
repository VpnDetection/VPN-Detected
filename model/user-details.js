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


    }

    setIp(ip){
        this.ip=ip;
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


    getIp(ip){
        return this.ip;
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
        return this.timezone;
    }
    getAnswer(){
        return this.answer;
    }
    getTime(){
        return this.time;
    }




    /*
    what kind informetion i need to save: 
        ip = 
        country =
        accept_language =  
        result = 
        time = 
        time_zone = 
        flag = 
        errors = 
        fullCountry = 
        answer = 
        ans=
        counter = 
        hostColor = 
        langColor =  
        */


}