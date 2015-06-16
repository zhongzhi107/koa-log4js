var log4js = require('log4js');

/*
* middleware
*/
module.exports = function(opts) {
  log4js.configure(opts && opts.configFile || 'log4js.json');
  var logger = log4js.getLogger();

  return function* (next){
    var req = this.request, header = req.header, nodeReq = this.req;
    var str = [
      req.ip,
      req.method,
      req.url,
      'HTTP/' + nodeReq.httpVersion,
      req.length || '-',
      header['user-agent']
    ].join('####');

    logger.info(str);
    yield next;
  }
};
