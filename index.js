var Host = document.getElementById("Host").innerHTML;
var BlackListIP = document.getElementById("BlackListIP").innerHTML;
var TimeZoneTxt = document.getElementById("TimeZone").innerHTML;
ipClient = document.getElementById("ipClient").innerHTML;
systemTime = new Date();
var Using;
var Result;
var TimeZonep;

function timeZone(result){
    var systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var ipTimeZone = document.getElementById("TimeZone").innerHTML;
    Result = result;
  
    if(systemTimeZone == ipTimeZone){
        TimeZonep = 0;
    }
    else{
        TimeZonep = 35;
        Result += 35;
    }

    if(Result >= 50){
    Using = '• Your Using VPN!';
    }
    else{
    Using = '• Your Not Using VPN.';
    }
    init()
  }


function init(){
  i = [0,0,0,0,0,0,0,0]

  //Client Info//
  Ip = '• Ip: ' + ipClient;
  SysDate = '• Sys Date: ' + systemTime;
  Timezone = '• Time Zone: ' + TimeZoneTxt;

  //Fucntion//
  BlackListip = '• BlackListIP: ' + BlackListIP +'%' + ' - Determine whether IP belongs to a hosting or VPN organization.';
  TimeZoneResult = '• Time Zone: ' + TimeZonep +'%' + ' - Compare client time zone with his system time zone.';
  HostField = '• "Host" Field: ' + Host +'%' + ' - Check "Host" IP header field is belongs to VPN or not.';

  //Result//
  FinalResult = '• Result: ' + Result +'%';

  var speed = 150;

  function typeWriter() {
      //Client Info//
      if (i[0] < Ip.length) {
        document.getElementById("Ip").innerHTML += Ip.charAt(i[0]);
        i[0]++;
      }
      if (i[1] < SysDate.length) {
        document.getElementById("SysDate").innerHTML += SysDate.charAt(i[1]);
        i[1]++;
      }
      if (i[2] < Timezone.length) {
        document.getElementById("Timezone").innerHTML += Timezone.charAt(i[2]);
        i[2]++;
      }

      //Fucntion//
      if (i[3] < BlackListip.length) {
        document.getElementById("BlackListip").innerHTML += BlackListip.charAt(i[3]);
        i[3]++;
      }
      if (i[4] < TimeZoneResult.length) {
        document.getElementById("TimeZoneResult").innerHTML += TimeZoneResult.charAt(i[4]);
        i[4]++;
      }
      if (i[5] < HostField.length) {
        document.getElementById("HostField").innerHTML += HostField.charAt(i[5]);
        i[5]++;
      }

      //Result//
      if (i[6] < FinalResult.length) {
        document.getElementById("FinalResult").innerHTML += FinalResult.charAt(i[6]);
        i[6]++;
      }
      if (i[7] < Using.length) {
        document.getElementById("Using").innerHTML += Using.charAt(i[7]);
        i[7]++;
      }

        setTimeout(typeWriter, speed);
    }

    typeWriter()
}