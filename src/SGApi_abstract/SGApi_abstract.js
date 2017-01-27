require('./jquery_ajax');

module.exports = class SGApi_abstract{
    constructor(token,mname){
        this._token = token;
        this._mname = mname;
        this._debugMode = false;
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
        let _this = this,
            xhr = new XMLHttpRequest();

        if(_this.debug){
            console.log(dataObj.method,url,JSON.stringify(dataObj.data));
        }

        $.ajax({
            type: dataObj.method,
            url: url,
            dataType: "json",
            data:dataObj.data,
            success: function(data) 
            {
                if(_this.debug){
                    console.log(data);
                }

                if(cb !== undefined){
                    cb(data);
                }
            },
            error:function(data)
            {
                console.error(data);
            }
        });
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
