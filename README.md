[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/s4qKYGb2)
# hw3-Graphics-using-SVG-and-Canvas

Please refer to [this link](https://hackmd.io/0pdizYkPTVqc7V30Gp11tA) to check the requirement of homework 3

# Report
* Student Name: 王堃宇
* Student ID: R11922102
* Deploy on Netlify, link: [https://ssui-hw3-skychocowhite.netlify.app/](https://ssui-hw3-skychocowhite.netlify.app/)

---

## How to Test
To test the operations, please refer ot the Netlify link above, and it will show the website for operation.

> If the website is not working, please execute the command to open the HTML file.
> ```
> ./index.html
> ```

## Difficulty and Design
For the most diffcult part, I think is the implementation for handling lots of events. In homework 2, I use the state diagram for the above implementation, but it still difficult to implement due to multiple objects can trigger the same or different events in the same time.

Since I want to use the state diagram again in homework 3 (sorry for doesn't display the state diagram, due to the midterm week and lack of time QQ), to solve this problem, I was advised by my lab teammates to use the so called **State Design Pattern**. Like the figure below, I use a class called **Context** and other **States** classes to separate the content and operations of state transitions.

![](https://i.imgur.com/Xl2HSM7.png)

[Reference](https://refactoring.guru/design-patterns/state)

The second hard implementation is how to execute different layers in different modes. To solve this, I design a class diagram and use **Double Dispatch** method to separate the implementation of layers and modes. The class diagram of the preliminary design for the requirements is displayed below.

![](./class-diagram.png)

**Classes brief explaination**
* `HtmlEventListenter` is used for add most of the events relative to HTML DOM elements.
* `Painter` is the class for task delegation, delegate changing modes and layers, and change parameter in side panel.
* `State` contains the operation in state transition and holds the state in the state diagram.
* `Layer` holds the operation for drawing on the each layer.
* `Mode` handles the task of what should be done in each mode

The last part is the cumbersome working on the layout of the website, though it is the must work on the UI development.

---

## Bonus - Line Mode
In the homework, I implement the paiting mode for lines in both Canvas and SVG layers. To test the result, just operate like the other two modes Rectangle Mode and Oval Mode. Both of the creation and the transformation on border color or width are implemented.

---

## What's Funny for My Website
Nothing.