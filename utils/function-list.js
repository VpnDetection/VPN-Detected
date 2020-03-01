const express = require('express');
const request = require('request');

const countryLanguage = require('country-language');


const User = require('../model/user-details');


const router = express.Router();

const userDetails = new User();

//Entering user data 
router.use('/',(req,res,next)=>{
    console.log('Entering user data ');
    userDetails.setUpdateUserData(req);
    next();
});

//DetectionInfo function();
router.use((req,res,next)=>{
    console.log('Start DetectionInfo function(): ');
    let ip = userDetails.getIp();
    request(`https://www.ipqualityscore.com/api/json/ip/uglNEXB1BLgftt4M5FyKRFrpdRFk6t0W/${ip}`,(error,response,body)=>{
        let isProxy,isTor,isVpn,isCrawler;
        const bodyData1 = JSON.parse(body);
        if(error || bodyData1['success'] === 'false'){
         console.log('DetectionInfo error:', bodyData1['success']);
        } else{
            isProxy = bodyData1['proxy'];
            isTor = bodyData1['tor'];
            isVpn = bodyData1['vpn'];
            isCrawler = bodyData1['is_crawler'];

            userDetails.getResultObject().setIsProxy(isProxy);
            userDetails.getResultObject().setIsTor(isTor);
            userDetails.getResultObject().setIsVpn(isVpn);
            userDetails.getResultObject().setIsCrawler(isCrawler);


            console.log('DetectionInfo result - ', 'isProxy: ' + bodyData1['proxy'] + ' isTor: ' + bodyData1['tor'] + ' isVpn: ' + bodyData1['vpn'] + ' isCrawler: ' + bodyData1['is_crawler']);
        }
        console.log('1.Result is:', userDetails.getResultObject().getResult());
        console.log("finish DetectionInfo function");
        next();
  });

});
//HostChecker function
router.use((req,res,next)=>{
    console.log('Start HostChecker function() ');

    const ip = userDetails.getIp();
    request(`https://www.ipqualityscore.com/api/json/ip/uglNEXB1BLgftt4M5FyKRFrpdRFk6t0W/${ip}`,(error,response,body)=>{
        let bodyData = JSON.parse(body);
        if(error || bodyData['success'] === false){
          console.log('HostChecker error:', bodyData['success']);
          hostColor = '#e6c300';
          check1 = 'Error!';
        
          userDetails.getResultObject().setHostColor(hostColor);
          userDetails.getResultObject().setCheck1(check1);
          userDetails.getResultObject().setError(userDetails.resultObject.getError()+1);
        }
        else{
          let ans = 0;
          let ipNumbers = ip.split('.');
          let replace = ipNumbers[0]+'-'+ipNumbers[1]+'-'+ipNumbers[2]+'-'+ipNumbers[3];
          ipNumbers.forEach(function (num) {ans += bodyData['host'].includes(num)})
          if(bodyData['host'] === ip || (bodyData['region'] === 'N\/A' && bodyData['city'] === 'N\/A') || !bodyData['host'].includes(replace) || ans < 4){
              let check1 = 'Failed';
              let percentage1 = 10
              let hostColor = '#ff0000'

              userDetails.getResultObject().setPercenTage1(percentage1);
              userDetails.getResultObject().setHostColor(hostColor);
              userDetails.getResultObject().setResult(userDetails.resultObject.getResult()+10);
              userDetails.getResultObject().setCheck1(check1);
              userDetails.getResultObject().setCounter(userDetails.resultObject.getCounter()+1);


            }
            else{
              check1 = 'Succeed';
              hostColor = '#8DC63F'
              
              userDetails.getResultObject().setCheck1(check1);
              userDetails.getResultObject().setHostColor(hostColor);
            }
            console.log('HostChecker result is:', bodyData['host'] + ' || Region: ' + bodyData['region'] + ' || City: ' + bodyData['city']);
          }
        
        
        result = userDetails.getResultObject().getResult();
        console.log('2.Result is:', result);
    })
    
    console.log('Finish HostChecker function ');
    next();
});


// Country_Language function

router.use((req,res,next)=>{
    console.log('Start Country_Language function()');

    let time,answer;
    try {
        console.log('iP_Country:',userDetails.getCountry());
        console.log('Accepted_Language:', userDetails.getAcceptLanguage());
      } catch (err) {
            'Country_Language Function Error!';
            let langColor = '#e6c300';
            let check4 = 'Error!';
            
            userDetails.getResultObject().setLangColor(langColor);
            userDetails.getResultObject().setCheck4(check4);
            userDetails.getResultObject().setError(userDetails.getResultObject().getError()+1);
        }
    
    let fullCountry = userDetails.getFullCountry();
    request(`https://api.ipgeolocation.io/timezone?apiKey=3f643672d11b4aff9c827233f1e5cb05&tz=` + fullCountry ,(error,response,body)=>{
      if(error || fullCountry === undefined){
        time = undefined;
      }
      else{
        time = JSON.parse(body)['time_24'];
      }  
      
      answer = 0;
      let country = userDetails.getCountry();
      let accept_language = userDetails.getAcceptLanguage();

      countryLanguage.getCountryLanguages(country, (err, languages)=> {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Languages: ',languages);
          languages.forEach( (languageCodes)=> {
            console.log('#.', languageCodes.iso639_1);
            if(languageCodes.iso639_1 !== 'en'){
                answer += accept_language.includes(languageCodes.iso639_1);
            }
            
          });
        }
      userDetails.setAnswer(answer);
      console.log('Country_Language result:', answer);
    
      if(!country || !accept_language){
        console.log('Country_Language error: Country: ' + country + '  Accepted_Language: ' + accept_language);
        langColor = '#e6c300';
        check4 = 'Error!';
        errors++;

        userDetails.getResultObject().setLangColor(langColor);
        userDetails.getResultObject().setCheck4(check4);
        userDetails.getResultObject().setError(userDetails.getResultObject().getError()+1);

      }
      else{
        if(country === 'US'){
          langColor = '#e6c300';
          check4 = 'US Error!';          
          userDetails.getResultObject().setLangColor(langColor);
          userDetails.getResultObject().setCheck4(check4);
         userDetails.getResultObject().setError(userDetails.getResultObject().getError()+1);

        }
        else{
            let check4, langColor;
          if(answer === 0){
            check4 = 'Failed';
            langColor = '#ff0000'
            let percentage4 = 20
            
            
            userDetails.getResultObject().setResult(userDetails.getResultObject().getResult()+20);
            userDetails.getResultObject().setPercenTage4(percentage4);
            userDetails.getResultObject().setCounter(userDetails.getResultObject().getCounter()+1);
          } else {

            check4 = 'Succeed';
            langColor = '#8DC63F'
        }
        userDetails.getResultObject().setLangColor(langColor);
        userDetails.getResultObject().setCheck4(check4);
      }

    }

    let result = userDetails.getResultObject().getResult();
    console.log('3.Result is:', result);
    console.log('finish Country_Language function');

    let flag = 'https://www.countryflags.io/' + country + '/shiny/24.png';
    console.log(`this is the flag verb ${flag}`);
    userDetails.getResultObject().setFlag(flag);
    userDetails.setTime(time);
    });
    res.cookie('name','vpnDetcted').render('index',{userDetails:userDetails});
});

});

exports.router = router;