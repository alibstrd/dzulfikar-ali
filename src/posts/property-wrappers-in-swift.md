---
title: "Property Wrappers in Swift"
date: "2023-05-03T20:31:59.889Z"
category: ["Swift"]
cover: "/images/blog/property-wrappers.jpg"
thumb: "/images/blog/sm/property-wrappers.jpg"
---

Back then, prior to Swift 5, every time we wanted to try accessing an object, we needed to create boilerplate code by creating repetitive code that could often be found in getters and setters of the properties.
<br><br>
Are you familiar with a code like this?

```Swift
var isDarkMode: Bool
    set {
        UserDefaults.standard.set(newValue, forKey: "is_dark_mode")
    }
    get {
        return UserDefaults.standard.bool(forKey: "is_dark_mode")
    }
}
```

Considering that this appears to be a not-too-bad option, a huge file with several defined keys and characteristics can develop swiftly along with how the project scales. It begs for a solution to simplify this because the code is repetitious.
<br><br>
After Swift 5.1 is introduced, it comes with **Property Wrappers**, a feature that addresses this issue by encapsulating common property patterns into reusable, easy-to-understand, and composable units. Property wrappers are defined using the @propertyWrapper annotation, and they wrap a property to control how it is accessed and modified.

<br>

#### Structure of a Property Wrapper

To create a property wrapper, you need to define two essential components:

1. Wrapped Value: This is the underlying value that your property stores. It can be of any type and is typically declared with the @propertyWrapper attribute.

2. Wrapper Structure/Class: The custom structure or class that implements the property wrapper. This includes a wrappedValue property and, optionally, getter and setter methods to define how the wrapped value is accessed and modified.

```swift
@propertyWrapper
class MyWrapper {
    private var value: Int

    init(initialValue: Int) {
        self.value = initialValue
    }

    var wrappedValue: Int {
        get { return value }
        set { value = newValue }
    }
}
```

<br>

Here, **MyWrapper** is a straightforward property wrapper that encapsulates an integer value. The **wrappedValue** property regulates access to and modification of the wrapped property. The property's initial value is initialized with the **init(initialValue:)** method.

<br>

#### Create a Custom Property Wrappers

Since iOS 14, SwiftUI has provided a property wrapper called **@AppStorage** to manage associated key-value stores supported by property list (plist) files, commonly referred to as **User Defaults**. However, UIKit is still preferred by many developers over SwiftUI. As a result, we would like to create our own **@AppStorage** that would work if we choose UIKit as our go-to working framework.

Taking the above example, we can rewrite the code and modify it to suit our needs. Make sure the Swift version is at least updated for Swift 5.1 and you are using Xcode 11.

```swift
@propertyWrapper
class AppStorage<Value> {
    let key: String
    let defaultValue: Value
    private let userDefaults: UserDefaults = .standard

    init(key: String, defaultValue: Value) {
        self.key = key
        self.defaultValue = defaultValue
    }

    var wrappedValue: Value {
        get {
            return userDefaults.object(forKey: key) as? Value ?? defaultValue
        }
        set {
            userDefaults.set(newValue, forKey: key)
        }
    }
}
```

<br>

As seen above, we created our own property wrapper that enables us to pass in a default value if there isn't yet a registered value. Since the wrapper uses a generic value called **Value**, we can pass in any value.

##### Accesing our own Property Wrapper

```swift
@AppStorage(key: "is_dark_mode", defaultValue: false) private var isDarkMode: Bool

print(isDarkMode) // Prints: false
isDarkMode = true
print(isDarkMode) // Prints: true

```

As you can see, we can now implement an @AppStorage wrapper similarly to SwiftUI.

<br>

> To avoid spelling and case inconsistencies, make sure you are storing the key using constant values like **Enum**.

<br><br>

### Conclusion

Property wrappers is a powerful a feature that adds a layer of separation between code that manages how a property is stored and the code that defines a property. It has the capabilities to reduce boilerplate in your code and make writing the same code twice less painful.

Several property wrappers that have already built into the SwiftUI framework: <font color="#72E2AE">@State, @Published, @ObservedObject, @EnvironmentObject and @Environment</font>.
