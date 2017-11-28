module.exports = class SGApi_abstract{
    constructor(token,mname,host){
        this._token = token;
        this._mname = mname;
        this._host = host !== undefined ? `http://${host}` : '';
        this._debugMode = false;
    }

    getApiUrl(aname,urlData){
        let url = `${this._host}/index.php?g=Wap&m=Apiresult&a=index&mname=${this._getProp('mname')}&aname=${aname}&token=${this._getProp('token')}`;
        return this._makeUrl(url,urlData);
    }

    getUrl(aname,urlData){
        let url = `${this._host}/index.php?g=Wap&m=Index&a=${aname}&token=${this._getProp('token')}`;
        return this._makeUrl(url,urlData);
    }

    request(url,dataObj,cb){
        let _this = this,
            xhr = new XMLHttpRequest();

        let parse = function(){
            let res = '';
            for (let key in dataObj.data) {
                res += encodeURIComponent(key)+"="+encodeURIComponent(dataObj.data[key])+"&";
            }
            return res.substring(0,res.length-1);
        };

        if(_this._debugMode){
            console.log(dataObj.method,url,JSON.stringify(dataObj.data));
        }

        xhr.open(dataObj.method,url);
        
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                let responseData = JSON.parse(xhr.responseText);
                
                if(_this._debugMode){
                    console.log(responseData);   
                }
                
                if(cb !== undefined){
                    cb(responseData);
                }
            }
        };
        
        xhr.send(parse(dataObj.data));
    }

    _makeUrl(url,dataObj){
        for(let d in dataObj){
            url += `&${d}=${dataObj[d]}`;
        }
        return url;
    }

    _getProp(propName){
        let val = this[`_${propName}`];
        if(val !== undefined){
            return val;
        }
    }
};
