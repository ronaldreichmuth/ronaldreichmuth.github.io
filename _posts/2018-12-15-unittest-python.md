---
layout: post
title: "Testing your Code with Python"
date: 2018-12-15
---

Below a brief example of a python unittest script. The example shows a echo loopback test of the serial port.

test_example.py
```python
import unittest
import serial
import argparse
import sys

class TestEcho(unittest.TestCase):
    """Testing of echo functionality"""
    def setUp(self):
        self.serial = serial.serial_for_url(args.port, 115200, timeout=1)

    def tearDown(self):
        self.serial.close()

    def test_EchoWith2Bytes(self):
        TxFrame = '\x01\x02'
        self.serial.write(TxFrame)
        RxFrame = self.serial.read(len(TxFrame))
        self.assertEqual(RxFrame, TxFrame)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Serial port loopback test')
    parser.add_argument('-p', '--port', default='loop://', help='Serial tport to test')
    args = parser.parse_args()

    sys.stdout.write("Testing port: {!r}\n".format(args.port))
    sys.argv[1:] = ['-v'] #enable a higher level of verbosity
    unittest.main()
```


How to run your testscript:
```
python test_example.py
```

Produces the following output:
```
test_EchoWith2Bytes(__main__.TestEcho) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.011s

OK
```
