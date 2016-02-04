//
//  NSSet+Serialization.m
//  ReportItQuick
//
//  Created by Hubert on 9/04/2015.
//  Copyright (c) 2015 Contact Point. All rights reserved.
//

#import "NSSet+Serialization.h"
#import "NSManagedObject+Serialization.h"

@implementation NSSet (Serialization)

- (NSArray *)toDictionaryArray
{
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:self.count];
    for (NSManagedObject *relatedObject in self) {
        [array addObject:[relatedObject toDictionary]];
    }
    return array;
}

/*
+ (NSSet *)fromDictionaryArray:(NSArray *)array context:(NSManagedObjectContext *)context
{
    NSMutableSet *set = [NSMutableSet setWithCapacity:array.count];
    for (NSDictionary *dictionary in array) {
        NSManagedObject *obj = [NSManagedObject initWithDictionary:dictionary
                                                         inContext:context];
        [set addObject:obj];
    }
    return [NSSet setWithSet:set];
}*/


- (void)clearSet
{
    for (NSManagedObject *relatedObject in self.allObjects) {
        [relatedObject.managedObjectContext deleteObject:relatedObject];
    }
}

@end
