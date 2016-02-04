//
//  NSManagedObject+Serialization.m
//  ReportItQuick
//
//  Created by Hubert on 8/04/2015.
//  Copyright (c) 2015 Contact Point. All rights reserved.
//

#import "NSManagedObject+Serialization.h"
#import "NSDictionary+Serialization.h"

@implementation NSManagedObject (Serialization)

- (NSDictionary *)toDictionary
{
    NSLog(@"To be implemented in each class...");
    return nil;
}


- (void)populateFromDictionary:(NSDictionary *)dict
{
    NSLog(@"To be implemented in each class...");
}


+ (instancetype)initWithDictionary:(NSDictionary *)dict
                         inContext:(NSManagedObjectContext *)context
{
    id newObject = [NSEntityDescription insertNewObjectForEntityForName:NSStringFromClass([self class])
                                                 inManagedObjectContext:context];
    [newObject populateFromDictionary:dict];
    return newObject;
}

/*
- (NSString *)description
{
    return [[self toDictionary] jsonString];
}*/

@end
