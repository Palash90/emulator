
# Onlline HDL Emulator

This is a Hardware Emulation Platform with minimal hardware description support. The emulator works on a Hardware Description Language (HDL). You can write the HDL Program and click on the Run button. The emulator builds an Abstract Syntax Tree (AST) and the runs it. It also generates a truth table with all the possible binary combinations of the inputs as mentioned in the File. Truth table works only upto 4 inputs, beyond that, it is cumbersome to verify all the input and output combinations manually. However, for more inputs, the emulator draws a table by grouping inputs and outputs of similar name. 
For example, if the inputs are a1, a2, a3, a4, a5, a6, a7, a8 then a column named a with a decimal equivalent of the binary input.

**N.B:** The emulator is not optimized and can only be used for education purpose. Some Good to Have Features are yet to be implemented. Check the 'Pending Features' section.

## Live Demo
The application is running live [here](http://emulator.palashkantikundu.in/) 

## Pending Features

Below is the list of features that would be beneficial to the projects but I could not implement them due to lack of time.

- Edit not saved icon
- On Double click of chip
- File rename
- Could not implement QNot on DLatch

## Contributors

[Palash Kanti Kundu](http://palashkantikundu.in)

## Contribution

I would love your support. You can contribute to this project in one of the following ways.

1. Walk through the emulator and design your own components and during the process if you feel anything is not working properly, raise an issue.
1. Improve this documentation.
1. If you are a programmer and have knowledge on Javascript Programming, go through the code base and look into the issues list and/or Pending Features List. Check if you can help by solving any issue. The code base is written on HTML/CSS/Javascript and is hosted on [Emulator](https://github.com/Palash90/emulator). Raise a PR and I will work on it.