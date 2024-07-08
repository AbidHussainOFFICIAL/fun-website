document.getElementById('jokeButton').addEventListener('click', generateJokes);
document.getElementById('toggleDarkMode').addEventListener('change', toggleDarkMode);
document.getElementById('copyButton').addEventListener('click', copyJoke);
document.querySelectorAll('.emoji').forEach(button => button.addEventListener('click', reactToJoke));
document.getElementById('shareTwitter').addEventListener('click', shareOnTwitter);
document.getElementById('shareFacebook').addEventListener('click', shareOnFacebook);
document.getElementById('searchButton').addEventListener('click', searchJokes);
document.getElementById('favorites').addEventListener('click', markAsFavorite);
setInterval(generateJokes, 30000);

async function generateJokes() {
    const jokeButton = document.getElementById('jokeButton');
    const jokesElement = document.getElementById('jokes');
    const loadingElement = document.getElementById('loading');
    const jokeSound = document.getElementById('jokeSound');
    const category = document.getElementById('category').value;

    jokeButton.disabled = true;
    loadingElement.style.display = 'block';

    try {
        const response = await fetch(`https://api.jokes.one/jod?category=${category}`);
        if (!response.ok) {
            throw new Error('Failed to fetch jokes');
        }
        const data = await response.json();
        const jokes = data.contents.jokes.map(j => j.joke.text);

        jokesElement.innerHTML = jokes.map(joke => `<li>${joke}</li>`).join('');
        loadingElement.style.display = 'none';
        jokeButton.disabled = false;
        jokeSound.play();
    } catch (error) {
        console.error('Error fetching jokes:', error.message);
        jokesElement.innerHTML = '<li>Failed to fetch jokes. Please try again later.</li>';
        loadingElement.style.display = 'none';
        jokeButton.disabled = false;
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function copyJoke() {
    const jokeText = document.getElementById('jokes').innerText;
    navigator.clipboard.writeText(jokeText).then(() => {
        alert('Joke copied to clipboard!');
    }).catch(error => {
        console.error('Failed to copy joke:', error.message);
    });
}

function reactToJoke(event) {
    alert(`You reacted with ${event.target.innerText}`);
}

function shareOnTwitter(event) {
    event.preventDefault();
    const jokeText = document.getElementById('jokes').innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(jokeText)}`;
    window.open(tweetUrl, '_blank');
}

function shareOnFacebook(event) {
    event.preventDefault();
    const jokeText = document.getElementById('jokes').innerText;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jokeText)}`;
    window.open(facebookUrl, '_blank');
}

function searchJokes() {
    const jokes = document.querySelectorAll('#jokes li');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    jokes.forEach(joke => {
        const jokeText = joke.innerText.toLowerCase();
        if (jokeText.includes(searchTerm)) {
            joke.style.display = 'block';
        } else {
            joke.style.display = 'none';
        }
    });
}

function markAsFavorite(event) {
    if (event.target.tagName === 'LI') {
        const jokeText = event.target.innerText;
        const favoriteJokesElement = document.getElementById('favoriteJokes');
        const li = document.createElement('li');
        li.innerText = jokeText;
        favoriteJokesElement.appendChild(li);
    }
}
