# xdrive
xdrive

# dev
use vue/router, requirejs, bootstrap, jquery, express, mongoose

- everything must run in mobile and desktop

- client are split into different apps (driver, customer, admin)
  but all hosted in publice

- use this for the map http://leafletjs.com/reference.html

- start the server by
> cd xdrive
> nodemon bin/www


# admin page
- show all drivers, there status and location

# customer page
- show to customer only 3 nearest available drivers
- can request a driver by selecting free one in the map (this is for immediately drive and location taken from
  customers position), ordering for future (filling a form)
- fix the price and show to customer (driver can't make his own)
- ensure the browser to send geolocations, otherwise tell him to use other browser or to allow this and how

# driver page
- save in db only runs of last x hours (admin-pref)
- sends location to server
- gets informed (peep signal) when request is arriving and can take the request
- requests either can come from customer-map-selection or scheduled through ordered requests
- a driver taking a ordered request - first come first go - he can decide best if is suits to him
- leads the driver through the process (punchin, take a customer request, start route, end route)
- show drivers which are available
- (is my location good?) average needed drives + available drivers
  (flag from red to green)
 this is based on statistic data which are renewed/rolled-over of a month
  (3km mesh, pref)
- offer customization (legal requirements, ...), fee: hours of dev
- signal when driver (login: only via facebook) and is offline for more
  than x minutes (pref), admin should phone him them
- if app recognizes internet is off (WS gets closed), write route into local
  storage until internet re-appears, then synchronize with server
- driver to admin messages, admin to drivers push (warnings, hints, ...)
  these are addons!
- scheduling
- punchin/out button

# backend
- Broadcaster-service: add/remove WS-connection, add/remove Topic, un/subscribe
- DrivesService: store coordinates

Entities:
Driver: id, facebook-id, position ({time, coord}), punchedIn (boolean), status [free, waiting, driving]
Drive: id, driverId, starttime, endtime, coords: [{time, [coord]}], requestId (may be null if wasn't requested)

CustomerRequest: id, forWhen (time), forWhere (coord), toWhere (coord)

Authentication:
- sessions must be stored in monogodb, and cleaned up when expired
 look here http://stackoverflow.com/questions/9525001/nodejs-express-mongo-session-storage


##
Fee: either rent the code and pay x-percent for each drive or
buy full app (fixed price - expensive!)
In any case must buy initial license.
