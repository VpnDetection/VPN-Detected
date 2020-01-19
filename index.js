
function compareLocalTime(result,counter) {
  //document.getElementById("percentage4").innerHTML = '0';
  var ipTime, systemTime, systemHour, systemMinutes, ipTimeSplit, ipHour, ipMinutes;

  ipTime = String(document.getElementById('localTime').innerHTML);

  systemTime = new Date();
  document.getElementById('date').innerHTML = systemTime;

  systemHour = systemTime.getHours().toString();
  systemHour = ("0" + systemHour).slice(-2);

  systemMinutes = systemTime.getMinutes().toString();
  systemMinutes = ("0" + systemMinutes).slice(-2);
  
  ipTimeSplit = ipTime.split(':');

  ipHour = ipTimeSplit[0];
  ipMinutes = ipTimeSplit[1];

  if(!ipTime || !systemTime || !systemHour || !systemMinutes || !ipHour || !ipMinutes){
    document.getElementById("check2").innerHTML = 'Checking Error';
  }
  else{
    if(systemMinutes == '59' && ipMinutes == '00' && ipHour == Number(systemHour)+1){
      document.getElementById("check2").innerHTML = 'Succeed';
    }
    else{
      if(systemHour==ipHour && (systemMinutes >= ipMinutes-2 && systemMinutes <= ipMinutes+5)){
        document.getElementById("check2").innerHTML = 'Succeed';
      }
      else{
        document.getElementById("check2").innerHTML = 'Failed';
        document.getElementById("check2").innerHTML = 'Failed';
        document.getElementById('date_time').setAttribute('data-percentage','20');
        document.getElementById('datePercentage').innerHTML = '20%';
        document.getElementById("datePercentage").setAttribute('style','color: #ff0000;');
        document.getElementById("dateStage").setAttribute('style','background: #ff0000;');
        document.getElementById("dateFg").setAttribute('style','width: 20%; background: #ff0000;');
        counter++;
        result += 20;
      }
    }
  }
  isTor(result,counter)
};

function isTor(result,counter){
  if (performance.now() % 100 !== 0) {
    Tor = 0;
    document.getElementById("check5").innerHTML = 'Succeed';
  }
  else{
    Tor = 25;
    result += 25;
    counter++;
    document.getElementById("check5").innerHTML = 'Failed';
    document.getElementById('tor').setAttribute('data-percentage','20');
    document.getElementById('torPercentage').innerHTML = '20%';
    document.getElementById("torPercentage").setAttribute('style','color: #ff0000;');
    document.getElementById("torStage").setAttribute('style','background: #ff0000;');
    document.getElementById("torFg").setAttribute('style','width: 20%; background: #ff0000;');
  }
  timeZone(result,counter)
}

function timeZone(result,counter){
  //document.getElementById("percentage4").innerHTML = '0';
  var usingElement = document.getElementById("using");
  var systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var ipTimeZone = document.getElementById("TimeZone").innerHTML;

  if(!systemTimeZone || !ipTimeZone){
    document.getElementById("check3").innerHTML = 'Checking Error';
  }
  else{
    if(systemTimeZone == ipTimeZone){
      document.getElementById("check3").innerHTML = 'Succeed';
    }
    else{
      document.getElementById("check3").innerHTML = 'Failed';
      document.getElementById('time_zone').setAttribute('data-percentage','20');
      document.getElementById('zonePercentage').innerHTML = '20%';
      document.getElementById("zonePercentage").setAttribute('style','color: #ff0000;');
      document.getElementById("zoneStage").setAttribute('style','background: #ff0000;');
      document.getElementById("zoneFg").setAttribute('style','width: 20%; background: #ff0000;');
      counter++;
      result += 20;
    }
  }

  document.getElementById("counter").innerHTML = counter;
  document.getElementById("progress").setAttribute('style', 'width: ' + counter * 20 + '%');
  Update();


  if(document.getElementById("check2").innerHTML == 'Checking Error' && document.getElementById("check3").innerHTML == 'Checking Error'){
    usingElement.classList.add("usingYellow");
    document.getElementById("using").innerHTML = 'Checking Error!';
  }
  else{
    if(result >= 65){
      usingElement.classList.add("usingRed");
      document.getElementById("using").innerHTML = 'You are Using VPN!' + result + '%';
    }
    else{
      usingElement.classList.add("usingBlue");
      document.getElementById("using").innerHTML = 'You are Not Using VPN.' + result + '%';
    }
  }
}

function Update(){
  $(".trigger").each(function() {
    $(this).each(function() {
      var percentage = $(this).data("percentage");
      $(this).css("height", percentage * 4 + "%"); 
      $(this).prop("Counter", 0).animate(
        {Counter: $(this).data("percentage")},{duration: 1800,easing: "swing",step: function(now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
  });
}