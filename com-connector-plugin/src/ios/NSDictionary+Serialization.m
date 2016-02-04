//
//  NSDictionary+Serialization.m
//  TollICR
//
//  Created by Nigel Maloney on 22/01/2015.
//
//

#import "NSDictionary+Serialization.h"

@implementation NSDictionary (Serialization)

- (id)objectForKey:(id)aKey or:(id)value {
    id obj = [self objectForKey:aKey];
    if (obj == [NSNull null]) {
        return value;
    } else if (obj == nil) {
        return value;
    } else {
        return obj;
    }
}

- (NSString *)stringForKey:(id)aKey {
    id obj = [self objectForKey:aKey];
    if (obj == [NSNull null]) {
        return @"";
    } else if (obj == nil) {
        return @"";
    } else {
        return obj;
    }
}

- (NSNumber *)integerForKey:(id)aKey {
    id obj = [self objectForKey:aKey];
    if (obj == [NSNull null]) {
        return @(0);
    } else if (obj == nil) {
        return @(0);
    } else {
        return [NSNumber numberWithInteger:[obj integerValue]];
    }
}

- (NSNumber *)doubleForKey:(id)aKey {
    id obj = [self objectForKey:aKey];
    if (obj == [NSNull null]) {
        return @(0);
    } else if (obj == nil) {
        return @(0);
    } else {
        return [NSNumber numberWithDouble:[obj doubleValue]];
    }
}

- (NSNumber *)booleanForKey:(id)aKey {
    id obj = [self objectForKey:aKey];
    if (obj == [NSNull null]) {
        return @(NO);
    } else if (obj == nil) {
        return @(NO);
    } else {
        return [NSNumber numberWithBool:[obj boolValue]];
    }
}

- (NSString *)jsonString {
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self options:0 error:&error];
    if (error) {
        NSLog(@"NSDictionary+Serialization jsonString error. Param: %@, error: %@, user info: %@", self, error, [error userInfo]);
        return @"";
    }
    return [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
}

+ (NSDictionary *)dictionaryFromJSONString:(NSString *)jsonString {
    NSError *error;
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *jsonDict = [NSJSONSerialization JSONObjectWithData:jsonData
                                                             options:NSJSONReadingAllowFragments
                                                               error:&error];
    if (error) {
        NSLog(@"NSDictionary+Serialization dictionaryFromJSONString error. Param: %@, error: %@, user info: %@", jsonString, error, [error userInfo]);
        jsonDict = [NSDictionary dictionary];
    }
    return jsonDict;
}

@end
