console.log("Hello World!");

var InterfaceController = WKInterfaceController.extend({
    awakeWithContext: function(context) {
        this.super.awakeWithContext(context);
      this._optionsTable.setNumberOfRowsWithRowType(2,"tableRowController");
       var row1 = this._optionsTable.rowControllerAtIndex(0);
       var row2 = this._optionsTable.rowControllerAtIndex(1);
       row1.interfaceLabel.setText("Park");
       row1.interfaceImage.setImage(UIImage.imageNamed("transport122"));
                                                       
       console.log("loaded?");
    },
    willActivate: function() {
        this.super.willActivate();
        console.log("InterfaceController: willActivate");
    },
    didDeactivate: function() {
        this.super.didDeactivate();
        console.log("InterfaceController: didDeactivate");
    },
    loadTable: function() {
        this._optionsTable.setNumberOfRowsWithRowType(2,"tableRowController");
        var row1 = this._optionsTable.rowControllerAtIndex(0);
        var row2 = this._optionsTable.rowControllerAtIndex(1);
        console.log("loaded?");
    },
    optionsTable: function() {
        return this._optionsTable;
    },
    "setOptionsTable:": function(value) {
        this._optionsTable = value;
        console.log("Set table: " + value);
    }
}, {
    name: "InterfaceController",
    exposedMethods: {
        loadTable: { returns: interop.types.void, params: [] },
        optionsTable: { returns: interop.types.id, params: [] },
        "setOptionsTable:": { returns: interop.types.void, params: [interop.types.id] }
    }
});

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

console.log("declared controllers");
