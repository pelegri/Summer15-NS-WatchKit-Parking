//
//  WKInterfaceController+TNS.m
//  WatchKitPark
//
//  Created by Antony Bello on 8/4/15.
//  Copyright (c) 2015 Telerik. All rights reserved.
//

#import "AlertInterfaceController.h"

@interface AlertInterfaceController()

@property (weak, nonatomic) IBOutlet WKInterfaceLabel *alertLabel;

@end


@implementation AlertInterfaceController

- (void)awakeWithContext:(id)context {
    [super awakeWithContext:context];
    
    // Configure interface objects here.
}

- (void)willActivate {
    // This method is called when watch view controller is about to be visible to user
    [super willActivate];
}

- (void)didDeactivate {
    // This method is called when watch view controller is no longer visible
    [super didDeactivate];
}



@end
