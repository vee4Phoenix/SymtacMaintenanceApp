//
//  NSDictionary+Serialization.h
//  TollICR
//
//  Created by Nigel Maloney on 22/01/2015.
//
//

#import <Foundation/Foundation.h>

@interface NSDictionary (Serialization)

- (id)objectForKey:(id)aKey or:(id)value;
- (NSString *)stringForKey:(id)aKey;
- (NSNumber *)integerForKey:(id)aKey;
- (NSNumber *)doubleForKey:(id)aKey;
- (NSNumber *)booleanForKey:(id)aKey;
- (NSString *)jsonString;
+ (NSDictionary *)dictionaryFromJSONString:(NSString *)jsonString;

@end
