const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "8", "10", "12"],
        answer: "8"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");

function displayQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    optionsElement.innerHTML = "";
    current.options.forEach((option, index) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.id = `option${index + 1}`;
        const label = document.createElement("label");
        label.htmlFor = `option${index + 1}`;
        label.textContent = option;
        optionsElement.appendChild(input);
        optionsElement.appendChild(label);
        optionsElement.appendChild(document.createElement("br"));
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector("input[name='option']:checked");
    if (selectedOption) {
        if (selectedOption.parentElement.textContent.trim() === questions[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.textContent = score;
}

function restartTest() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    questionContainer.style.display = "block";
    resultContainer.style.display = "none";
}

document.getElementById("next-btn").addEventListener("click", checkAnswer);
document.getElementById("restart-btn").addEventListener("click", restartTest);

displayQuestion();



function sendRegistrationData() {
    
    var name = document.getElementById("name").value;
    var mobile = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;
    var category = document.getElementById("category").value;

    
    var formData = {
        name: name,
        mobile: mobile,
        email: email,
        category: category
    };

    
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Registration successful');
            
        } else {
            console.error('Registration failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function displayRegisteredDetails() {
    
    fetch('/registrations')
    .then(response => response.json())
    .then(data => {
       
        var detailsContainer = document.getElementById('registered-details');
        detailsContainer.innerHTML = ''; 
        data.forEach(registration => {
            var detailItem = document.createElement('div');
            detailItem.textContent = `Name: ${registration.name}, Mobile: ${registration.mobile}, Email: ${registration.email}, Category: ${registration.category}`;
            detailsContainer.appendChild(detailItem);
        });
    })
    .catch(error => {
        console.error('Error fetching registered details:', error);
    });
}


displayRegisteredDetails();