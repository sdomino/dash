var dash,
  slice = [].slice;

dash = (function() {
  dash.prototype._prefix = "dash";

  dash.prototype._logsEnabled = false;

  dash.prototype._logLevels = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "SILENT"];

  dash.prototype._logLevel = "DEBUG";

  dash.prototype._backlog = [];

  function dash() {}

  dash.prototype._log = function(opts) {
    var log;
    log = {
      args: opts.args,
      level: opts.level,
      msg: opts.msg,
      styles: opts.styles,
      timestamp: new Date()
    };
    this._backlog.push(log);
    if (this._logsEnabled && (this._logLevels.indexOf(this._logLevel) <= this._logLevels.indexOf(log.level))) {
      if (log.args.length) {
        return console.log("%c[" + this._prefix + ".log] " + log.level + " :: " + log.msg, log.styles, log.args);
      } else {
        return console.log("%c[" + this._prefix + ".log] " + log.level + " :: " + log.msg, log.styles);
      }
    }
  };

  dash.prototype.trace = function() {
    var args, msg;
    msg = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return this._log({
      level: 'TRACE',
      styles: 'color:#0099ff',
      msg: msg,
      args: args
    });
  };

  dash.prototype.debug = function() {
    var args, msg;
    msg = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return this._log({
      level: 'DEBUG',
      styles: 'color:#0099ff',
      msg: msg,
      args: args
    });
  };

  dash.prototype.info = function() {
    var args, msg;
    msg = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return this._log({
      level: 'INFO',
      styles: 'color:#009933',
      msg: msg,
      args: args
    });
  };

  dash.prototype.warn = function() {
    var args, msg;
    msg = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return this._log({
      level: 'WARN',
      styles: 'color:#ff6600',
      msg: msg,
      args: args
    });
  };

  dash.prototype.error = function() {
    var args, msg;
    msg = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return this._log({
      level: 'ERROR',
      styles: 'color:#ff3333',
      msg: msg,
      args: args
    });
  };

  dash.prototype.fatal = function() {
    var args, msg;
    msg = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return this._log({
      level: 'FATAL',
      styles: 'color:#990000',
      msg: msg,
      args: args
    });
  };

  dash.prototype.backlog = function() {
    var i, len, log, ref, results;
    ref = this._backlog;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      log = ref[i];
      results.push(console.log("%c(" + log.timestamp + ") [" + this._prefix + ".backlog] " + log.level + " :: " + log.msg, log.styles, log.args));
    }
    return results;
  };

  dash.prototype.enableLogs = function() {
    this.warn(this._prefix + " logs enabled");
    return this._logsEnabled = true;
  };

  dash.prototype.disableLogs = function() {
    this.warn(this._prefix + " logs disabled");
    return this._logsEnabled = false;
  };

  dash.prototype.setPrefix = function(prefix) {
    return this._prefix = prefix;
  };

  dash.prototype.setLevel = function(level) {
    var lvl;
    lvl = level.toUpperCase();
    if (this._logLevels.includes(lvl)) {
      return this._logLevel = lvl;
    } else {
      return this.error("Unsupported log level '" + lvl + "'");
    }
  };

  return dash;

})();
