//
//  main.m
//  WatchKitPark
//
//  Created by Antony Bello on 7/17/15.
//  Copyright (c) 2015 Telerik. All rights reserved.
//

#import <WatchKit/WatchKit.h>
#import <NativeScript/NativeScript.h>

static TNSRuntime* runtime;

__attribute__((constructor))
void initialize() {
    runtime = [[TNSRuntime alloc] initWithApplicationPath:[NSBundle mainBundle].bundlePath];
    TNSRuntimeInspector.logsToSystemConsole = YES;
    [runtime executeModule:@"./controller.js"];
}