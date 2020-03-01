module.exports = class Result {
    constructor() {
        this.percentage1 = 0;
        this.percentage4 = 0;
        this.counter = 0;
        this.result = 0;
        this.errors = 0;
        this.hostColor='';
        this.check1 ='';
        this.check4 = '';
        this.langColor= '';
        this.flag ='';
        this.isVpn='';
        this.isProxy='';
        this.isTor='';
        this.isCrawler='';

    }
    setPercenTage1(percent){
        this.percentage1 = percent;
    }
    setPercenTage4(percent){
        this.percentage4 = percent;
    }
    setCounter(counter){
        this.counter = counter;
    }
    setResult(result){
        this.result = result;
    }
    setError(errors){
        this.errors = errors;
    }
    setHostColor(hostColor){
        this.hostColor = hostColor;
    }
    setCheck1(check1){
        this.check1=check1;
    }
    setLangColor(langColor){
        this.langColor = langColor;
    }

    setCheck4(check4){
        this.check4 = check4;
    }

    setFlag(flag){
        this.flag = flag;
    }

    setIsTor(isTor){
        this.isTor = isTor;
    }
    setIsVpn(isVpn){
        this.isVpn = isVpn;
    }
    setIsProxy(isProxy){
        this.isProxy = isProxy;
    }
    setIsCrawler(isCrawler){
        this.isCrawler=isCrawler;
    }

    getIsTor(){
        return this.isTor;
    }

    getIsVpn(){
        return this.isVpn;
    }

    getIsProxy(){
        return this.isProxy;
    }

    getIsCrawler(){
        return this.isCrawler;
    }
    
    getFlag(){
        return this.flag;
    }

    getCheck4(){
        return this.check4;
    }

    getLangColor(){
        return this.langColor;
    }

    getPercentTage1(){
        return this.percentage1;
    }

    getPercentTage4(){
        return this.percentage4;
    }

    getCounter(){
        return this.counter;
    }

    getResult(){
        return this.result;
    }

    getError(){
        return this.error;
    }

    getHostColor(){
        return this.hostColor;
    }

    getCheck1(){
        return this.check1;
    }


}