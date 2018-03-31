---
layout: post
title: "UIView Extension in Swift"
date: 2018-03-31
---
Nachfolgend eine praktische Erweiterung der UIImage Klasse zum verkleinern von Bildern vor einem Upload oder Darstellung auf einem Gerät.

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
