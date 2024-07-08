document.getElementById('jokeButton').addEventListener('click', generateJokes);
document.getElementById('toggleDarkMode').addEventListener('change', toggleDarkMode);
document.getElementById('copyButton').addEventListener('click', copyJoke);
document.querySelectorAll('.emoji').forEach(button => button.addEventListener('click', reactToJoke));
setInterval(generateJokes, 30000);

async function generateJokes() {
    const jokeButton = document.getElementById('jokeButton');
    const jokesElement = document.getElementById('jokes');
    const loadingElement = document.getElementById('loading');
    const jokeSound = document.getElementById('jokeSound');

    jokeButton.disabled = true;
    loadingElement.style.display = 'block';

    const response = await fetch('https://api.jokes.one/jod?category=animal');
    const data = await response.json();
    const jokes = data.contents.jokes.map(j => j.joke.text);

    jokesElement.innerHTML = jokes.map(joke => `<li>${joke}</li>`).join('');
    loadingElement.style.display = 'none';
    jokeButton.disabled = false;
    jokeSound.play();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function copyJoke() {
    const jokeText = document.getElementById('jokes').innerText;
    navigator.clipboard.writeText(jokeText).then(() => {
        alert('Joke copied to clipboard!');
    });
}

function reactToJoke(event) {
    alert(`You reacted with ${event.target.innerText}`);
}
