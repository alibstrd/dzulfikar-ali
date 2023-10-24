---
title: "Optional Protocol Method in Delegation Pattern"
date: "2023-08-08T20:31:59.889Z"
category: ["Swift", "Design Pattern"]
cover: "/images/blog/optional-protocol.jpg"
thumb: "/images/blog/optional-protocol.jpg"
---

As we all know, Swift relies on a protocol-oriented approach as its programming paradigm. Instead of object-oriented programming (OOP) like most programming languages do, we called it protocol-oriented programming (POP). One of the main differences between POP and OOP is that POP promotes composition over inheritance. This means that you should define a set of protocols that can be adopted by any conforming type instead of using inheritance to create a hierarchy of classes.

What makes protocol special is that Swift checks for protocol conformity issues at compile time, allowing developers to discover some fatal bugs in the code even before running the program. Protocols allow developers to write flexible and extensible code in Swift without having to compromise the language’s expressiveness.

<br>

### Protocols in Delegation Pattern

As iOS developers, we unconsciously depend a lot on how we use delegation as our preferred pattern to communicate between objects.

We must agree that, at some point in our development journey, we had an error message like this right?

![](/images/blog/optionalprotocol-ss.png)

<br>

The example above is a built-in protocol provided by the UIKit framework, especially for the table view component. It sure is a well-designed one that guarantees which methods are needed and which are not to implement.

<br>

### Create Our Own Delegation Protocol

```swift
protocol Pet {
    func eating()
    func meowing()
    func barking()
}
```

Here we created a protocol called **Pet**, it has several methods that can later be used for **MyPet** to conform.

<br>

```swift
class MyCat {
    weak var delegate: Pet?

    func doDelegate() {
        delegate?.eating()
        delegate?.meowing()
    }
}

class MyPet: Pet {
    init() {
        let myInstance = MyCat()
        myInstance.delegate = self
    }

    func eating() {
        // Do eating
    }

    func meowing() {
        // Do meowing
    }

    func barking() {
        // Do barking
    }
}
```

As you could see from the code above, when we clicked the recommendation regarding protocol conformance from Xcode, it generated all the methods from Pet's protocol. Nevertheless, we don't want to make our cat barking, it doesn't make any sense lol. We need to make some adjustments to our code, some methods need to be optional based on the behaviour of the pet itself.

<br>

### How to Make Optional Methods in Protocol

**There are 2 possible solutions:**

<h4> 1. Using @objc optional</h4>

Prior to Swift era, all Apple developers including iOS used Objective-C as their primary language to develop applications. Optional method itself comes from Objective-C language, `@objc` annotation means we want our Swift code (class, method, property, etc.) to be visible from Objective-C.
<br>

This is a simple implementation if we want to make an optional method protocol in Objective-C:

```objc
@protocol ProtocolWithOptional

- (void) returnVoidFunction;
- (NSString *) returnStringFunction;

@optional
- (NSInteger) returnIntegerFunction;

@end
```

And this is how we do it in Swift:

```swift
@objc protocol ProtocolWithOptional {
    func returnVoidFunction()
    func returnStringFunction() -> String

    @objc optional func returnIntegerFunction() -> Int
}
```

We notice the similarity between them that they both have an optional attribute between them, it's just that in Swift we need to add the `@objc` annotation as well because we are explicitly using an Objective-C feature.

<br>

##### Apply @objc optional to Our Pet's Protocol

```swift
@objc protocol Pet {
    func eating()
    @objc optional func meowing()
    @objc optional func barking()
}
```

<br>
Updated implementation after using @objc optional:

```swift
class MyCat {
    weak var delegate: Pet?

    func doDelegate() {
        delegate?.eating()
        delegate?.meowing?()
    }
}

class MyPet: Pet {
    init() {
        let myInstance = MyCat()
        myInstance.delegate = self
    }

    func eating() {
        // Do eating
    }

    func meowing() {
        // Do meowing
    }
}
```

Thanks to `@objc` optional, now **MyPet** is able to remove `barking()` method from conformation to Pet's protocol without alerting an error. If you notice **MyCat** class, there is also a slight update regarding how the delegate accesses an optional method, it adds a question mark as well -> `delegate?.meowing(?)()`

<br>
<h4>2. Create Default Implementation with Protocol Extension</h4>

In earlier versions of Swift, it was possible to only extend classes, structures, and enums, just like many modern programming languages. However, since version 2 of Swift, it became possible to support protocols extension. Protocol extensions provide a default implementation that can be used by conforming types or overridden if needed.

This is simple implementation of protocol extension and its result:

```swift
protocol MyProtocol {
    func doSomething()
}

// Provide default implementation using extension
extension MyProtocol {
    func doSomething() {
        print("Default implementation of doSomething")
    }
}

// How it's accessed
class MyClass: MyProtocol {
    // No compile error
    // No need to provide an implementation for doSomething()
}
```

<br>

##### Apply Protocol Extension to Our Pet's Protocol

```swift
protocol Pet {
    func eating()
    func meowing()
    func barking()
}

extension Pet {
    func meowing() {
        // Do meowing
    }

    func barking() {
        // Do barking
    }
}
```

<br>
Updated implementation after using protocol extension:

```swift
class MyCat {
    weak var delegate: Pet?

    func doDelegate() {
        delegate?.eating()
        delegate?.meowing()
    }
}

class MyPet: Pet {
    init() {
        let myInstance = MyCat()
        myInstance.delegate = self
    }

    func eating() {
        // Do eating
    }

    // Overriding method
    func meowing() {
        // Do meowing with passion
    }
}
```

<br>

Now our code would work similarly to `@objc` optional as well. With default implementation, it is highly powerful to be able to extend an existing protocol, allowing protocols to develop and be extended without having to worry about breaking existing code compatibility. And it's also reducing the need for redundant code in the conforming types.

<br>

### Conclusion

`@objc` optional works perfectly fine because our delegation pattern relies heavily on reference types of usage. However, it severely limits our protocol's capabilities as well, as it requires all conforming types to be Objective-C compatible. This means only classes that inherit from `NSObject` can conform to such a protocol. No structs, no enums, no associated types. If you work with value-type objects, I do believe protocol extension is your best option.
