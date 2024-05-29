#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// This project is a simple console based Student Management System. In this project you will be learning how to add new students,
// how to generate a 5 digit unique studentID for each student, how to enroll students in the given courses. Also,
// you will be implementing the following operations enroll, view balance, pay tuition fees, show status, etc.
//  The status will show all the details of the student including name, id, courses enrolled and balance.
//  This is one of the best projects to implement the Object Oriented Programming concept
console.log(chalk.green.bold.italic("Welcome to the Student Management System!"));
console.log(chalk.blue.bold.italic("Developed by: ZEENAT SOMROO"));
let kind = [];
//looping over an array
const courses = {
    course1: "JavaScript",
    course2: "Python",
    course3: "Java",
    course4: "HTML",
    course5: "CSS",
    course6: "React",
    course7: "Node.js",
    course8: "SQL",
    course9: "Machine Learning",
    course10: "Data Structures and Algorithms",
};
let values = Object.values(courses);
class Student {
    name;
    id;
    balance;
    course;
    constructor(name) {
        this.name = name;
        this.id = Math.floor(Math.random() * 100000); //After getting desired value ,constructor pass all  values to the class and then class crrates an object according to the blueprint. but the name of classs updated from [student to NewStudent] because of the intances we use to pass the paramter to the constructor
        this.balance = 1000;
        this.course = [];
    }
    enroll(course) {
        this.course.push(course); // uing function to push course in to this.course
    }
}
while (true) {
    let answer = await inquirer.prompt([
        {
            message: "Please select an Option:",
            name: "option",
            type: "list",
            choices: [
                "Add Student",
                "Enroll Student",
                "View Balance",
                "Pay tution fee",
                "View status",
                "Exit",
            ],
        },
    ]);
    //1) When the user selects option 1 Enroll Student
    if (answer.option === "Exit") {
        console.log("\n", chalk.greenBright.bold.italic("Thank you for using the Student Management Program.DEVELOPED BY : ZEENAT SOMROO. GOODBYE HAVE A NICE DAY!"));
        break;
    }
    if (answer.option === "Add Student") {
        let answer1 = await inquirer.prompt([
            {
                message: "Enter student Name:",
                name: "name",
                type: "string",
            },
        ]);
        let newStudent = new Student(answer1.name); // passing [answer1.name = any name written in message ] to the counstructor to create a object with thw help pf class
        console.log(chalk.yellow("---------------------------------------------------------"));
        console.log("Dear", chalk.magenta.bold.italic(newStudent.name), "you are added sucssesfully & Your ID number is = " +
            chalk.cyan.italic(newStudent.id));
        console.log(chalk.yellow("---------------------------------------------------------"));
        kind.push(newStudent);
    }
    //2) When the user selects option 2 Enroll Student
    if (answer.option === "Enroll Student") {
        let foundID = false;
        while (!foundID) {
            let answer2 = await inquirer.prompt([
                {
                    message: "Please Enter your ID number:",
                    name: "number",
                    type: "number",
                },
            ]);
            for (let i = 0; i < kind.length; i++) {
                // looping through the kind array which is present at the top of the code . to get access of every element inside of object .
                if (answer2.number == kind[i].id) {
                    foundID = true;
                    let answer3 = await inquirer.prompt([
                        {
                            message: "Please select any course",
                            name: "course",
                            type: "list",
                            choices: values,
                        },
                    ]);
                    // calling enroll function to pass course in it which we select
                    kind[i].enroll(answer3.course);
                    console.log(chalk.yellow("---------------------------------------------------------------------------"));
                    console.log("Dear", chalk.blue.bold.italic(kind[i].name), `you have successfully enrolled in "${chalk.cyanBright.bold(answer3.course)}" course `);
                    console.log(chalk.yellow("----------------------------------------------------------------------------"));
                    break;
                }
            }
            if (!foundID) {
                console.log(chalk.redBright.bold("Please enter correct ID number"));
            }
        }
    }
    //3) When the user selects option 3 View Balance
    if (answer.option === "View Balance") {
        let foundID = false;
        while (!foundID) { // If !foundID is false then loop will dead, or if !foundID is true then loop will continue// Then read this
            let answer4 = await inquirer.prompt([
                {
                    message: "Please Enter your ID number:",
                    name: "number",
                    type: "number",
                },
            ]);
            for (let i = 0; i < kind.length; i++) {
                // looping through the kind array which is present at the top of the code . to get access of every element inside of object .
                if (answer4.number === kind[i].id) {
                    foundID = true; //if this condition is true then if block execute and loop will break.but due to this !foundID becomes false/// first read this to understand the condition 
                    console.log(chalk.yellow("-------------------------------------------------------------"));
                    console.log(`Dear ${chalk.blueBright.bold(kind[i].name)} your current balance is : ${chalk.green(kind[i].balance)}$`);
                    console.log(chalk.yellow("-------------------------------------------------------------"));
                    break;
                }
            }
            if (!foundID) {
                console.log(chalk.redBright.bold("Please enter correct ID number"));
            }
        }
    }
    //4) When the user selects option 4 Pay tution fee
    if (answer.option == "Pay tution fee") {
        let foundID = false;
        while (!foundID) {
            let answer5 = await inquirer.prompt([
                {
                    message: "Please Enter your ID number:",
                    name: "number",
                    type: "number",
                },
            ]);
            for (let i = 0; i < kind.length; i++) {
                if (answer5.number === kind[i].id) {
                    foundID = true;
                    let answer6 = await inquirer.prompt([
                        {
                            message: "PLease enter the amount to pay:",
                            name: "amount",
                            type: "number",
                        },
                    ]);
                    if (answer6.amount > kind[i].balance) {
                        console.log("\n", chalk.redBright.bold("Insufficient balance"), "\n");
                    }
                    else {
                        kind[i].balance -= answer6.amount;
                        console.log(chalk.yellow("-------------------------------------------------------------"));
                        console.log(` ${chalk.blueBright.bold(kind[i].name)} has paid : ${chalk.green(answer6.amount)}$ tution fee`);
                        console.log(chalk.yellow("-------------------------------------------------------------"));
                    }
                    if (!foundID) {
                        console.log(chalk.redBright.bold("Please enter correct ID number"));
                    }
                }
            }
        }
    }
    //5) when the user select option view Status
    if (answer.option === "View status") {
        let foundID = false;
        while (!foundID) {
            let answer7 = await inquirer.prompt([
                {
                    message: "Please Enter your ID number:",
                    name: "number",
                    type: "number",
                },
            ]);
            for (let i = 0; i < kind.length; i++) {
                // looping through the kind array which is present at the top of the code . to get access of every element inside of object .
                if (answer7.number === kind[i].id) {
                    foundID = true;
                    console.log(chalk.red("-------------------------------------------------------------"));
                    console.log(` Name = ${chalk.cyanBright(kind[i].name)} \n ID = ${chalk.cyanBright(kind[i].id)} \n Balance = ${chalk.cyanBright(kind[i].balance)} \n Course = ${chalk.cyanBright(kind[i].course)}`);
                    console.log(chalk.red("-------------------------------------------------------------"));
                    break;
                }
            }
            if (!foundID) {
                console.log(chalk.redBright.bold("Please enter correct ID number"));
            }
        }
    }
} // while loop end bracke
