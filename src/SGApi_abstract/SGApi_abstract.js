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

        let on_response = function(er, response, body) {
          if(er)
            throw er
            console.log(response,body);
        }

        if(dataObj.method ===undefined){
            return console.log(`data need include http request Method`);
        }

        if(dataObj.data ===undefined || dataObj.data ===''){
            dataObj.data = null;
        }

        $.ajax({
          type: dataObj.method,
              url: url,
              dataType: "json",
              data:dataObj.data,
               success: function(data) 
              {
                if(cb !== undefined){
                    cb(data);
                }
              },
              error:function(data)
              {
                console.error(data);
              }
        });
       
        // xhr.open(dataObj.method,url);
        
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        // xhr.onreadystatechange = function() {
        //     if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        //         let responseData = JSON.parse(xhr.responseText);
                
        //         if(_this._debugMode){
        //             console.log(responseData);   
        //         }
                
        //         if(cb !== undefined){
        //             cb(responseData);
        //         }
        //     }
        // };
        
        // if(_this._debugMode){
        //    console.log(`${dataObj.method}\n${url}\n${JSON.stringify(dataObj.data)}`);   
        // }
        // xhr.send(JSON.stringify(dataObj.data));
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
