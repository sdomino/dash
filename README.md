Dash is a simple wrapper around console that provides some pretty output, log levels, a log prefix, and a backlog

## Usage
```coffeescript

dash.fatal("uh oh!")
# => [dash.log] FATAL :: uh oh!
```

## Properties

```coffeescript
setLevel("level")       # set the log level to one of "TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", or "SILENT"
setPrefix("prefix")     # the prefix attached to each log
enableLogs()            # enables logs
disableLogs()           # disables logs
backlog()               # shows all logs logged so far

trace("msg", args...)   # outputs a trace level log
debug("msg", args...)   # outputs a debug level log
info("msg", args...)    # outputs an info level log
warn("msg", args...)    # outputs a warn level log
error("msg", args...)   # outputs an error level log
fatal("msg", args...)   # outputs a fatal level log
```
