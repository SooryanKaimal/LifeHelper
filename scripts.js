// No-refresh navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Tool 1: To-Do List
function addTask() {
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();
    if (taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button onclick="this.parentElement.remove()">Delete</button>
            <input type="checkbox" onclick="this.previousElementSibling.style.textDecoration = this.checked ? 'line-through' : 'none'">
        `;
        document.getElementById('todo-list').appendChild(li);
        input.value = '';
    }
}

// Tool 2: Budget Calculator
function calcBudget() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const expense = parseFloat(document.getElementById('expense').value) || 0;
    const balance = income - expense;
    document.getElementById('budget-output').textContent = 
        `Balance: $${balance.toFixed(2)} ${balance >= 0 ? '(Surplus)' : '(Deficit)'}`;
}

// Tool 3: Unit Converter
function convertUnit() {
    const value = parseFloat(document.getElementById('unit-input').value) || 0;
    const fromUnit = document.getElementById('unit-from').value;
    const toUnit = document.getElementById('unit-to').value;
    let result;

    if (fromUnit === toUnit) {
        result = value;
    } else if (fromUnit === 'm' && toUnit === 'ft') {
        result = value * 3.28084; // Meters to Feet
    } else if (fromUnit === 'ft' && toUnit === 'm') {
        result = value / 3.28084; // Feet to Meters
    }

    document.getElementById('unit-output').textContent = `${result.toFixed(2)} ${toUnit}`;
}

// Tool 4: Random Name Generator
function generateName() {
    const firstNames = ['Alex', 'Jamie', 'Taylor', 'Sam', 'Riley', 'Morgan'];
    const lastNames = ['Smith', 'Jones', 'Brown', 'Davis', 'Wilson', 'Clark'];
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    document.getElementById('name-output').textContent = `${first} ${last}`;
}

// Tool 5: Countdown Timer
let countdownInterval;
let countdownTime;

function startCountdown() {
    stopCountdown();
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    countdownTime = minutes * 60;
    if (countdownTime > 0) {
        countdownInterval = setInterval(() => {
            const minutesLeft = Math.floor(countdownTime / 60);
            const secondsLeft = countdownTime % 60;
            document.getElementById('timer-output').textContent = 
                `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
            countdownTime--;
            if (countdownTime < 0) {
                clearInterval(countdownInterval);
                document.getElementById('timer-output').textContent = 'Time’s Up!';
            }
        }, 1000);
    }
}

function stopCountdown() {
    clearInterval(countdownInterval);
}

// Tool 6: BMI Calculator
function calcBMI() {
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const height = parseFloat(document.getElementById('height').value) || 0;
    if (weight > 0 && height > 0) {
        const bmi = weight / (height * height);
        let status;
        if (bmi < 18.5) status = 'Underweight';
        else if (bmi < 25) status = 'Normal';
        else if (bmi < 30) status = 'Overweight';
        else status = 'Obese';
        document.getElementById('bmi-output').textContent = `BMI: ${bmi.toFixed(1)} (${status})`;
    } else {
        document.getElementById('bmi-output').textContent = 'Please enter valid weight and height.';
    }
}

// Tool 7: Password Generator
function generatePassword() {
    const length = parseInt(document.getElementById('pass-length').value) || 12;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < Math.min(Math.max(length, 8), 20); i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('pass-output').textContent = password;
}

// Tool 8: Text-to-Speech
const synth = window.speechSynthesis;
let voices = [];

function populateVoices() {
    voices = synth.getVoices();
    const voiceSelect = document.getElementById('tts-voice');
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Load voices when available (some browsers load them asynchronously)
populateVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoices;
}

function speakText() {
    const text = document.getElementById('tts-input').value.trim();
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        const voiceIndex = document.getElementById('tts-voice').value;
        utterance.voice = voices[voiceIndex];
        utterance.rate = 1; // Normal speed
        synth.speak(utterance);
    }
}

function stopSpeech() {
    synth.cancel();
}