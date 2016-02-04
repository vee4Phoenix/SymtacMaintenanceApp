//
//  CPUserDefaults.h
//  AppMe
//
//  Created by Nigel Maloney on 27/02/2015.
//
//

#import <Foundation/Foundation.h>

@interface CPUserDefaults : NSObject

+ (BOOL)hasKey:(NSString *)key;
+ (void)removeKey:(NSString *)key;
+ (void)clear;

+ (NSString *)getValue:(NSString *)key;
+ (void)setValue:(NSString *)value key:(NSString *)value;

@end
