//
//  CPUserDefaults.m
//  AppMe
//
//  Created by Nigel Maloney on 27/02/2015.
//
//

#import "CPUserDefaults.h"

@implementation CPUserDefaults

+ (BOOL)hasKey:(NSString *)key {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    return [defaults objectForKey:key] != nil;
}


+ (void)removeKey:(NSString *)key {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults removeObjectForKey:key];
    [defaults synchronize];
}


+ (void)clear {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString *appDomain = [[NSBundle mainBundle] bundleIdentifier];
    [defaults removePersistentDomainForName:appDomain];
    [defaults synchronize];
}


+ (NSString *)getValue:(NSString *)key {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString *value = [defaults stringForKey:key];
    return value != nil ? value : @"";
}


+ (void)setValue:(NSString *)value key:(NSString *)key {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:key];
    [defaults synchronize];
}

@end
