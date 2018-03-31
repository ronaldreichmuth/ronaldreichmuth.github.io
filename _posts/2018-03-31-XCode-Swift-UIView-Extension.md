---
layout: post
title: "UIView Extension in Swift"
date: 2018-03-31
---
Nachfolgend eine praktische Erweiterung der UIImage Klasse. Die Funktion kann verwendet werden um Bildern vor einem Upload oder Darstellung zu verkleinern.

```swift
extension UIImage {
    func resized(toWidth width: CGFloat) -> UIImage? {
        let canvasSize = CGSize(width: width, height: CGFloat(ceil(width/size.width * size.height)))
        UIGraphicsBeginImageContextWithOptions(canvasSize, false, scale)
        defer { UIGraphicsEndImageContext() }
        draw(in: CGRect(origin: .zero, size: canvasSize))
        return UIGraphicsGetImageFromCurrentImageContext()
    }
}
```
