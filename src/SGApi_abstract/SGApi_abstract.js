module.exports = class SGApi_abstract{
    constructor(token,mname){
        this._token = token;
        this._mname = mname;
    }

    getApiUrl(aname,urlData){
        let url = `/index.php?g=Wap&m=Apiresult&a=index&mname=${this._getProp('mname')}&aname=${aname}&token=${this._getProp('token')}`;
        return this._makeUrl(url,urlData);
    }

    getUrl(aname,urlData){
        let url = `/index.php?g=Wap&m=Index&a=${aname}&token=${this._getProp('token')}`;
        return this._makeUrl(url,urlData);
    }

    request(url,dataObj,cb){
        let xhr = new XMLHttpRequest();

        if(dataObj.method ===undefined){
            return console.log(`data need include http request Method`);
        }

        if(dataObj.data ===undefined || dataObj.data ===''){
            dataObj.data = null;
        }

        xhr.open(dataObj.method,url);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                let responseData = JSON.parse(xhr.responseText);
                if(cb !== undefined){
                    cb(responseData);
                }
            }
        };
        xhr.send(dataObj.data);
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