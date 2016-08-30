# dash is a simple wrapper around console.log that provides some pretty output,
# log levels, a log prefix, and a backlog
;class dash

  #
  _prefix:      "dash"      # used as a prefix for log output
  _logsEnabled: false       # logs disabled by default
  _logLevels:   ["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "SILENT"] # all available log levels
  _logLevel:    "DEBUG"     # logs set to DEBUG by default
  _backlog:     [ ]         # used to store logs for review later

  # constructor
  constructor : () ->

  # log prints a given message if logs are enabled and the level of the log is less than the log level
  _log : (opts) ->
    log = {
      args:      opts.args
      level:     opts.level
      msg:       opts.msg
      styles:    opts.styles
      timestamp: new Date()
    }

    # add the log to the backlog
    @_backlog.push log

    # if the current log level is less than the set log level and logs are enabled, print the log
    if @_logsEnabled && (@_logLevels.indexOf(@_logLevel) <= @_logLevels.indexOf(log.level))
      if log.args.length
        console.log("%c[#{@_prefix}.log] #{log.level} :: #{log.msg}", log.styles, log.args)
      else
        console.log("%c[#{@_prefix}.log] #{log.level} :: #{log.msg}", log.styles)

  # different levels of log output
  trace : (msg, args...) -> @_log({ level: 'TRACE', styles: 'color:#0099ff', msg: msg, args: args })
  debug : (msg, args...) -> @_log({ level: 'DEBUG', styles: 'color:#0099ff', msg: msg, args: args })
  info  : (msg, args...) -> @_log({ level: 'INFO',  styles: 'color:#009933', msg: msg, args: args })
  warn  : (msg, args...) -> @_log({ level: 'WARN',  styles: 'color:#ff6600', msg: msg, args: args })
  error : (msg, args...) -> @_log({ level: 'ERROR', styles: 'color:#ff3333', msg: msg, args: args })
  fatal : (msg, args...) -> @_log({ level: 'FATAL', styles: 'color:#990000', msg: msg, args: args })

  # backlog stores all logs in a local array to be displayed back later
  backlog : () ->
    for log in @_backlog
      console.log("%c(#{log.timestamp}) [#{@_prefix}.backlog] #{log.level} :: #{log.msg}", log.styles, log.args)

  # enable logs
  enableLogs : () -> @warn "#{@_prefix} logs enabled"; @_logsEnabled = true

  # disable logs
  disableLogs : () -> @warn "#{@_prefix} logs disabled"; @_logsEnabled = false

  # set log prefix
  setPrefix : (prefix) -> @_prefix = prefix

  # set log level
  setLevel : (level) ->

    #
    lvl = level.toUpperCase()

    # make sure the desired level is one of the available levels
    if @_logLevels.includes(lvl) then @_logLevel = lvl
    else @error "Unsupported log level '#{lvl}'"
