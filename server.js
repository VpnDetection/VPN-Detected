var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')
var app = express();
var os = require("os");
var ipClient;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var result, time_zone;
var ans, Mobile, hostname;
var percent1,percent2;

app.get('/', function(req, res) {
    percent1 = null;
    percent2 = null;
    result = 0;
    hostname = os.hostname();
    console.log("\n------------------------------------------------------");
    //ipClient = '217.182.175.75'; //Proxy
    //ipClient = '104.248.140.7'; //VPN
    //ipClient = '109.64.101.97'; //Real IP
    ipClient = req.header('x-forwarded-for');
    console.log("Client Connected..");
    console.log(`Client IP: ${ipClient}`);
    console.log("----------------BlackListIP--------------------");
    BlackListIP(res);
})

let port = process.env.PORT;;
if (port == null || port == "") {
    port = 3000;
  }

app.listen(port);
console.log("-------------------");
app.use(express.static(__dirname + '/'));
console.log("Server is running..");

function BlackListIP(res)
{
  request(`https://ip.teoh.io/api/vpn/${ipClient}`,function(error,response,body){
    var bodyData1 = JSON.parse(body);
    if(error || bodyData1['message'] == 'IP Address is invalid.'){
      console.log('BlackListIP error:', bodyData1['message']);
    }
    else{
      if(bodyData1['risk'] == 'high'){
        result += 35;
        percent1 = '35'

        }
        else{
          percent1 = '0'
        }
        console.log('BlackListIP result is:', bodyData1['vpn_or_proxy']);
      }
    console.log('1. Result is:', result);
    console.log("--------------------HostChecker-----------------------");
    HostChecker(res);
  }
)};


function HostChecker(res)
{
   request(`https://www.ipqualityscore.com/api/json/ip/uglNEXB1BLgftt4M5FyKRFrpdRFk6t0W/${ipClient}`,function(error,response,body){
    var bodyData = JSON.parse(body);
    if(error || bodyData['success'] == false){
      console.log('HostChecker error:', bodyData['success']);
    }
    else{
      Mobile = bodyData['mobile']
      ans = 0;
      ipNumbers = ipClient.split('.');
      replace = ipNumbers[0]+'-'+ipNumbers[1]+'-'+ipNumbers[2]+'-'+ipNumbers[3];
      ipNumbers.forEach(function (num) {ans += bodyData['host'].includes(num)})
      if(bodyData['host'] == ipClient || (bodyData['region'] == 'N\/A' && bodyData['city'] == 'N\/A') || !bodyData['host'].includes(replace) || ans < 4){
          result += 15;
          percent2 = '15'
        }
      else{
        percent2 = '0'
      }
        console.log('HostChecker result is:', bodyData['host'] + ' || Region: ' + bodyData['region'] + ' || City: ' + bodyData['city']);
      }
    console.log('2. Result is:', result);
    console.log("---------------------Time_Zone------------------------");
    Time_Zone(res);
 })
};

function Time_Zone(res){
  request(`https://api.ipgeolocation.io/timezone?apiKey=3f643672d11b4aff9c827233f1e5cb05&ip=${ipClient}`,function(error,response,body){
  if(error || body.includes('not valid')){
    time_zone = undefined;
  }
  else{
    time_zone = JSON.parse(body)['timezone'];
    console.log('Time_Zone result:', time_zone);
  }  
  console.log("--------------------Request End-----------------------");
  res.render('index',{result,time_zone,Mobile,ipClient,hostname,percent1,percent2});
  })
};