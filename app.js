// require necessary assets
const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHtml = generatePage(name, github)

// fs.writeFile('index.html', pageHtml, err => {
//     if (err) throw err;

//     console.log('Portfolio completed! Check out the index.html to see the output!');
// });

// function to prompt user for their information
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required):',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

// function to prompt user for project information
const promptProject = portfolioData => {
    // if no array exists, create an array to hold the projects
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    // inform user a new project being created
    console.log(`
        =================
        Add a New Project
        =================
    `);

    // prompt for project information
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: projectName => {
            if (projectName) {
                return true;
            } else {
                console.log('Please enter the project name!');
                return false;
            }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required):',
        validate: projectDescription => {
            if (projectDescription) {
                return true;
            } else {
                console.log('Please enter the project description!');
                return false;
            }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'],
        validate: languageChoices => {
            if (languageChoices.length > 1 ) {
                return true;
            } else {
                console.log('Please select at least one language!');
                return false;
            }
        }
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project (Required):',
        validate: githubLink => {
            if (githubLink) {
                return true;
            } else {
                console.log('Please enter the GitHub link!');
                return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    })
};

// run prompt function and then chain responses
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData) 
    });