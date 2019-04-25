
/////////////////////////////////////////////////
// Mock out the node request / response functions
// Note: these are useful when running bare node.
// There are better options if using expressjs.
/////////////////////////////////////////////////

var request = function(url, method, postdata) {
  this.url = url;
  this.method = method;
  this._postData = postdata;
  this.setEncoding = function() { /* noop */ };

  this.addListener = this.on = (type, callback) => {
    if (type === 'data') {
      if (this._postData) {
        callback(Buffer.from(this._postData));
      } else {
        callback(Buffer.from(''));
      }
    }
    if (type === 'end') {
      callback();
    }
    return this;
  };
};

var response = function() {
  this._ended = false;
  this._responseCode = null;
  this._headers = null;
  this._data = Buffer.alloc(0);

  this.on = this.once = this.emit = ()=>{};

  this.writeHead = (responseCode, headers) => {
    this._responseCode = responseCode;
    this._headers = headers;
  };

  this.write = (data) => {
    if (data) {
      this._data = Buffer.concat([this._data, Buffer.from(data)]);
    }
  };

  this.end = (data) => {
    this._ended = true;
    if (data) {
      this._data = Buffer.concat([this._data, Buffer.from(data)]);
    }
  };
};

module.exports = {
  mock: (url, method, postdata) => {
    return {
      req: new request(url, method, postdata),
      res: new response
    };
  }
};
