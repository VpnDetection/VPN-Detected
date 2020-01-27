var result = document.getElementById('Result').innerHTML;
var counter = document.getElementById('Counter').innerHTML;
var errors = document.getElementById('Errors').innerHTML;


function localTime() {
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
    document.getElementById("check2").innerHTML = 'Error!';
    document.getElementById("datePercentage").setAttribute('style','color: #e6c300;');
    document.getElementById("dateStage").setAttribute('style','background: #e6c300;');
    errors++;
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
        document.getElementById('date_time').setAttribute('data-percentage','15');
        document.getElementById('datePercentage').innerHTML = '15%';
        document.getElementById("datePercentage").setAttribute('style','color: #ff0000;');
        document.getElementById("dateStage").setAttribute('style','background: #ff0000;');
        document.getElementById("dateFg").setAttribute('style','width: 15%; background: #ff0000;');
        counter++;
        result += 15;
      }
    }
  }
  timeZone();
};


function timeZone(){
  var systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var ipTimeZone = document.getElementById("TimeZone").innerHTML;

  if(!systemTimeZone || !ipTimeZone){
    document.getElementById("check3").innerHTML = 'Error!';
    document.getElementById("zonePercentage").setAttribute('style','color: #e6c300;');
    document.getElementById("zoneStage").setAttribute('style','background: #e6c300;');
    errors++;
  }
  else{
    if(systemTimeZone == ipTimeZone){
      document.getElementById("check3").innerHTML = 'Succeed';
    }
    else{
      document.getElementById("check3").innerHTML = 'Failed';
      document.getElementById('time_zone').setAttribute('data-percentage','15');
      document.getElementById('zonePercentage').innerHTML = '15%';
      document.getElementById("zonePercentage").setAttribute('style','color: #ff0000;');
      document.getElementById("zoneStage").setAttribute('style','background: #ff0000;');
      document.getElementById("zoneFg").setAttribute('style','width: 15%; background: #ff0000;');
      counter++;
      result += 15;
    }
  }
  isTor();
};


function isTor(){
  if (performance.now() % 100 !== 0) {
    document.getElementById("check5").innerHTML = 'Succeed';
  }
  else{
    result += 25;
    counter++;
    document.getElementById("check5").innerHTML = 'Failed';
    document.getElementById('tor').setAttribute('data-percentage','20');
    document.getElementById('torPercentage').innerHTML = '20%';
    document.getElementById("torPercentage").setAttribute('style','color: #ff0000;');
    document.getElementById("torStage").setAttribute('style','background: #ff0000;');
    document.getElementById("torFg").setAttribute('style','width: 20%; background: #ff0000;');
  }
  WebRTC();
};


function WebRTC(){
  try{
    var clientIP = document.getElementById("clientIP").innerHTML;
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({iceServers: [{urls: "stun:stun.l.google.com:19302"}]}),
      noop = function() {},
      localIPs = {},
      ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
      key;
  
    function ipIterate(ip) {
      if (!localIPs[ip]);
      localIPs[ip] = true;
    }
    
    pc.createDataChannel("");
    
    pc.createOffer(function(sdp) {
      sdp.sdp.split('\n').forEach(function(line) {
        if (line.indexOf('candidate') < 0) return;
        line.match(ipRegex).forEach(ipIterate);
      });
      pc.setLocalDescription(sdp, noop, noop);
    }, noop);
    
    pc.onicecandidate = function(ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
      ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
      check();
    };
  }
  catch(err){
    check()
  }

  function check(){
    if(!Object.keys(localIPs)[0] && !Object.keys(localIPs)[1]){
      document.getElementById("check6").innerHTML = 'Error!';
      document.getElementById("rtcPercentage").setAttribute('style','color: #e6c300;');
      document.getElementById("rtcStage").setAttribute('style','background: #e6c300;');
      errors++;
    }
    else{
      if (clientIP == Object.keys(localIPs)[0] || clientIP == Object.keys(localIPs)[1]) {
        document.getElementById("check6").innerHTML = 'Succeed';
      }
      else{
        result += 20;
        counter++;
        document.getElementById("check6").innerHTML = 'Failed';
        document.getElementById('WebRTC').setAttribute('data-percentage','20');
        document.getElementById('rtcPercentage').innerHTML = '20%';
        document.getElementById("rtcPercentage").setAttribute('style','color: #ff0000;');
        document.getElementById("rtcStage").setAttribute('style','background: #ff0000;');
        document.getElementById("rtcFg").setAttribute('style','width: 20%; background: #ff0000;');
        document.getElementById("leakedIPs").innerHTML = "<u>leaked</u> <u>ip's:</u><br>" + Object.keys(localIPs)[0];
        if(Object.keys(localIPs)[1] != '0.0.0.0' && Object.keys(localIPs)[1] != 'undefined'){
          document.getElementById("leakedIPs").innerHTML += ' / ' + Object.keys(localIPs)[1];
        }
      }
    }
    Update();
  }
};


function Update(){
  if(errors >= 3){
    document.getElementById("using").setAttribute('style','color: #e6c300;');
    document.getElementById("using").innerHTML = 'Checking Error!';
  }
  else{
    if(result >= 50){
      document.getElementById("using").setAttribute('style','color: #ff0000;');
      document.getElementById("using").innerHTML = 'You are Using VPN!';
    }
    else{
      document.getElementById("using").setAttribute('style','color: #0071b3;');
      document.getElementById("using").innerHTML = 'You are Not Using VPN.';
    }
  }

  document.getElementById("count").innerHTML = counter;
  document.getElementById("progress").setAttribute('style', 'width: ' + counter * 100/6 + '%');

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

