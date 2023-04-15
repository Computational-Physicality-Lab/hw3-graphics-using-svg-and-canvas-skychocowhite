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

## Difficulty and Design
For the most diffcult part, I think is the implementation for handling lots of events. In homework 2, I use the state diagram for the above implementation, but it still difficult to implement due to multiple objects can trigger the same or different events in the same time.

Since I want to use the state diagram again in homework 3 (sorry for doesn't display the state diagram, due to the midterm week and lack of time QQ), to solve this problem, I was advised by my lab teammates to use the so called **State Design Pattern**. Like the figure below, I use a class called **Context** and other **States** classes to separate the content and operations of state transitions.

![](https://i.imgur.com/Xl2HSM7.png)

[Reference](https://refactoring.guru/design-patterns/state)