## Inspiration
Too many students are forced to waste money on the "iClicker," a massively overpriced hand-held remote polling device popular with some college professors for taking attendance, quizzes, and gauging lecture understanding in large classes. Another example of the routine price scalping for school supplies students face every year, the primary motivation for my product is: ***Fuck iClicker.***
## What it does

>No clicker hardware.
>
>No mobile apps.
>
>No physical base-station.
>
>No cost.

Create a poll, display it to a class, and let students respond on their own devices *for free.*

Polls are served to students over wireless LAN from a single laptop or desktop computer.

Smartphones, tablets, laptops, desktops; most any device with a modern web browser should be able to participate in an OpenClicker quiz.

## How I built it
### Core
OpenClicker's core is single desktop application built on Electron with HTML5 front end and Node.js back end. When an instructor opens a quiz, a small Node.js web server makes the polling GUI available to students on the same wireless LAN.
### Polling GUI
When a quiz is open, students simply enter the information on the instructor's screen into their web browsers on mobile or desktop. The GUI itself is HTML5 and JavaScript.
### Shared Look & Feel
In this way, no special mobile app or hardware is required for students and no base station hardware is necessary for instructors. GUI styling for both the core and polling GUI uses Bootstrap themes from Bootswatch for a consistent, responsive interface.

## Challenges I ran into/Accomplishments that I'm proud of
### Multplatform Consistency
Making the OpenClicker Core and especially Polling GUI share a common feel and functionality across a variety of devices without having to result to a remotely hosted HTML5 hybrid application and/or multiple unsustainable native applications. I was able to successfully use the particular setting that OpenClicker would be expected to work in to make this possible. I took advantage of the shared LAN connection between all participants in a clicker quiz to serve an HTML5 interface without relying on any external hosting services.
### Scalability
Something I had to keep in mind during development was that the application would potentially have to scale to lecture halls of ~500 students. Functionality on the core server was written as mostly asynchronous Node.js for all functionality that could come under high demand during a quiz and networked data transfers are optimized to avoid eating up unnecessary bandwidth, which should all lend the application to scalability in theory.


## What I learned
The value of designing to creatively leverage technologies outside of their intended, documented use cases.

Electron

More advance usage of Node.js & JavaScript

Caffeinated cereal exists and keeps me v e r y awake.

## What's next for OpenClicker
Code legibility and documentation overhaul

Remove hard-coded restrictions (number of questions/possible answers)

Improved data validation

More useful insights visualization/analysis built-in for results.

Distribution
