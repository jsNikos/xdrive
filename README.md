# xdrive
xdrive

# dev
use ember, requirejs, bootstrap, jquery, express, mongoose
https://github.com/eguneys/gulp-ember-requirejs
https://github.com/fernandogmar/Emberjs-RequireJS

- everything must run in mobile and desktop

# admin page
- show all drivers, there status and location

# customer page
- show to customer only 3 nearest available drivers
- fix the price and show to customer (driver can't make his own)

# driver page
- save in db only runs of last x hours (admin-pref)
- show drivers which are available
- (is my location good?) average needed drives + available drivers
  (flag from red to green)
 this is based on statistic data which are renewed/rolled-over of a month
  (3km mesh, pref)
- offer customization (legal requirements, ...), fee: hours of dev
- signal when driver (login: only via facebook) and is offline for more
  than x minutes (pref), admin should phone him them
- if app recogniyes internet is off (WS gets closed), write route into local
  storage until internet re-appears, then synchronize with server
- driver to admin messages, admin to drivers push (warnings, hints, ...)
  these are addons!
- scheduling

Fee: either rent the code and pay x-percent for each drive or
buy full app (fixed price - expensive!)
In any case must buy initial license.
