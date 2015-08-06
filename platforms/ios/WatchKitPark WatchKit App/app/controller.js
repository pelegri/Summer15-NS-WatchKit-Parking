/*
 *
 *  WatchKit Parker
 *  A NativeScript WatchKit application that keeps track of your parking time.
 *  Antony Bello, Summer 2015.
 *
 */

var SERVER_URL = ''; // <== ENTER SERVER URL HERE
var minutesRemaining, parkingDuration;
var userDefaults = NSUserDefaults.standardUserDefaults(); // Create unique user ID.
setUUIDString(userDefaults);
var uuidString = getUUIDString(userDefaults);

/* Callback for when phone sends data to watch. */
var replyCallback = function(info, error) {
  console.log("info: " + info);
  console.log("error: " + error);
  var lat = 0;
  var long = 0;
  if (info) {
    var lat = info.objectForKey("lat");
    var long = info.objectForKey("long");
  }
  console.log("App replied! " + lat + " x " + long);
}
exports.replyCallback = replyCallback;

var InterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
      // Sets parameters to open phone.
      var userInfo = NSMutableDictionary.alloc().init();
      userInfo.setObjectForKey("My data", "data");
      console.log("wake parent app...");
      WKInterfaceController.openParentApplicationReply(userInfo, replyCallback);
  },
  willActivate: function() {
    this.super.willActivate();
  },
  didDeactivate: function() {
    this.super.didDeactivate();
  },
  timeButtonTap: function() {
    var controller = this;

    /*
    * Block of code would be called if location is within a danger zone.
    * this.pushControllerWithNameContext("AlertInterfaceController", null);
    */

    // Get info from the server for current parking time.
    var requestParams = setURLParamsWithEnding('getinfo');
    makeRequest('getinfo', requestParams, controller);
  },
  parkButtonTap: function() {
    this.pushControllerWithNameContext("ParkInterfaceController", null);
  }
}, {
  name: "InterfaceController",
  exposedMethods: {
    parkButtonTap: {
      returns: interop.types.void,
      params: []
    },
    timeButtonTap: {
      returns: interop.types.void,
      params: []
    }
  }
});

/*
* The interface where user sets the parking time.
*/
var ParkInterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
    parkingDuration = this._slider.value; // Initial parking duration
  },
  willActivate: function() {
    this.super.willActivate();
  },
  didDeactivate: function() {
    this.super.didDeactivate();
  },
  "sliderValueChanged:": function(value) {
    parkingDuration = value; // Save how long the user parks for
    this._sliderLabel.setText(value + " Minutes");
  },
  slider: function() {
    return this._slider;
  },
  "setSlider:": function(value) {
    this._slider = value;
  },
  headerLabel: function() {
    return this._headerLabel;
  },
  "setHeaderLabel:": function(value) {
    this._headerLabel = value;
  },
  separator: function() {
    return this._separator;
  },
  "setSeparator:": function(value) {
    this._separator = value;
  },
  // User taps "park", sends the current time, userID, and parking duration to server
  parkTapped: function() {
    var controller = this;
    var requestParams = setURLParamsWithEnding('adduser');
    if (parkingDuration) {
      requestParams.setValueForHTTPHeaderField(parkingDuration.toString(), "parkingDuration");
      makeRequest('adduser', requestParams, controller);
    }
  },
  sliderLabel: function() {
    return this._sliderLabel;
  },
  "setSliderLabel:": function(value) {
    this._sliderLabel = value;
  }
}, {
  name: "ParkInterfaceController",
  exposedMethods: {
    "sliderValueChanged:": {
      returns: interop.types.void,
      params: [interop.types.float]
    },
    parkTapped: {
      returns: interop.types.void,
      params: []
    },
    sliderLabel: {
      returns: interop.types.id,
      params: []
    },
    slider: {
      returns: interop.types.id,
      params: []
    },
    headerLabel: {
      returns: interop.types.id,
      params: []
    },
    separator: {
      returns: interop.types.id,
      params: []
    },
    "setSlider:": {
      returns: interop.types.void,
      params: [interop.types.id]
    },
    "setSliderLabel:": {
      returns: interop.types.void,
      params: [interop.types.id]
    },
    "setHeaderLabel:": {
      returns: interop.types.void,
      params: [interop.types.id]
    },
    "setSeparator:": {
      returns: interop.types.void,
      params: [interop.types.id]
    }
  }
});

/*
* Interface controller to check remaining time.
*/
var TimeInterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
    if (minutesRemaining) {
      this._timeLabel.setText("You have " + minutesRemaining + " minutes remaining.");
    } else {
      this._timeLabel.setText("Park first.")
    }
  },
  willActivate: function() {
    this.super.willActivate();
  },
  didDeactivate: function() {
    this.super.didDeactivate();
  },
  timeLabel: function() {
    return this._timeLabel;
  },
  "setTimeLabel:": function(value) {
    this._timeLabel = value;
  }
}, {
  name: "TimeInterfaceController",
  exposedMethods: {
    timeLabel: {
      returns: interop.types.id,
      params: []
    },
    "setTimeLabel:": {
      returns: interop.types.void,
      params: [interop.types.id]
    }
  }
});

/*
* Interface controller that would pop up if user is in a special zone.
*/
var AlertInterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
  },
  willActivate: function() {
    this.super.willActivate();
  },
  didDeactivate: function() {
    this.super.didDeactivate();
  },
  alertLabel: function() {
    return this._timeLabel;
  },
  "setAlertLabel:": function(value) {
    this._timeLabel = value;
  }
}, {
  name: "AlertInterfaceController",
  exposedMethods: {
    timeLabel: {
      returns: interop.types.id,
      params: []
    },
    "setTimeLabel:": {
      returns: interop.types.void,
      params: [interop.types.id]
    }
  }
});

// Unused...
var NotificationController = WKUserNotificationInterfaceController.extend({
  willActivate: function() {
    this.super.willActivate();
    console.log("NotificationController: willActivate");
  },
  didDeactivate: function() {
    this.super.didDeactivate();
    console.log("NotificationController: didDeactivate");
  }
}, {
  name: "NotificationController"
});

var GlanceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
    console.log("GlanceController: awakeWithContext");
  },
  willActivate: function() {
    this.super.willActivate();
    console.log("GlanceController: willActivate");
  },
  didDeactivate: function() {
    this.super.didDeactivate();
    console.log("GlanceController: didDeactivate");
  }
}, {
  name: "GlanceController"
});


/*
 * Sets the request parameters based on the button user clicks. Buttons are either
 * getinfo or adduser. Makes a request object that is later passed on to the
 * native iOS NSURLSession object.
 */
function setURLParamsWithEnding(ending) {
  var response, error;
  var requestData = NSMutableDictionary.alloc().init();
  requestData.setObjectForKey(uuidString, "userID");
  var jsonData = NSJSONSerialization.dataWithJSONObjectOptionsError(requestData, NSJSONWritingPrettyPrinted, error);
  var dateString = initializeDateString();
  var url = NSURL.URLWithString(SERVER_URL + '/'+ ending);
  var request = NSMutableURLRequest.requestWithURL(url);
  request.HTTPMethod = "POST";
  request.setValueForHTTPHeaderField(uuidString, "userID");
  request.setValueForHTTPHeaderField("application/json", "content-type");
  request.setValueForHTTPHeaderField("123", "auth");
  request.setValueForHTTPHeaderField(dateString, "timeParked");
  request.postBody = jsonData;
  return request;
}

/*
 * Using the request parameters, makes an http request to modulus server either
 * placing information into the DB or requesting time remaining, based on ending.
 */
function makeRequest(ending, requestParams, controller) {
  var response, error;
  var sessionConfig = NSURLSessionConfiguration.defaultSessionConfiguration();
  var queue = NSOperationQueue.mainQueue();
  var session = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, null, queue);
  var dataTask = session.dataTaskWithRequestCompletionHandler(requestParams, function(data, response, error) {
    if (error) {
      console.log(error);
      return;
    } else {
      handleResponseBasedOnEnding(ending, data, controller);
    }
  });
  dataTask.resume();
}

/*
 * Handles the http request based on what kind it was. If user is requesting
 * information, it pushes the time to the time interface controller. Otherwise,
 * It resets the parking duration to the time remaining, and indicates a
 * successful request.
 */
function handleResponseBasedOnEnding(ending, data, controller) {
  if(ending == "getinfo") {
    minutesRemaining = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding);
    controller.pushControllerWithNameContext("TimeInterfaceController", null);
  } else if (ending == "adduser") {
    minutesRemaining = parkingDuration;
    controller._sliderLabel.setText("Time set successfully.");
  } else {
    console.log("What the hell happened: " + ending);
  }
}

/*
 * Creates a date object to be sent to the server.
 */
function initializeDateString() {
  var date = NSDate.alloc().init();
  var dateFormatter = NSDateFormatter.alloc().init();
  dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS";
  return dateFormatter.stringFromDate(date);
}

/*
 * Sets the unique userID if it's a new user. Persists on the device as it is
 * saved in NSUserDefaults.
 */
function setUUIDString(userDefaults) {
  if (!userDefaults.stringForKey("AUTH")) {
    var uuidRef = CFUUIDCreate(kCFAllocatorDefault);
    var uuidStringRef = CFUUIDCreateString(kCFAllocatorDefault, uuidRef);
    CFRelease(uuidRef);
    userDefaults.setObjectForKey(uuidStringRef, "AUTH");
    userDefaults.synchronize();
  }
}

/*
 * Gets the unique UUID of the user.
 */
function getUUIDString(userDefaults) {
  return userDefaults.stringForKey("AUTH");
}
