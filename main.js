// script.js functionality
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        let currentIndex = 0;
        const texts = document.querySelectorAll('.about-text');
        let intervalId;

        function showText(index) {
            texts.forEach((text, i) => {
                text.classList.remove('active');
                if (i === index) {
                    text.classList.add('active');
                }
            });
        }

        function nextText() {
            currentIndex = (currentIndex + 1) % texts.length;
            showText(currentIndex);
            resetInterval();
        }

        function prevText() {
            currentIndex = (currentIndex - 1 + texts.length) % texts.length;
            showText(currentIndex);
            resetInterval();
        }

        function resetInterval() {
            clearInterval(intervalId);
            intervalId = setInterval(nextText, 15000);
        }

        if (texts.length > 0) {
            intervalId = setInterval(nextText, 15000);
            const leftArrow = document.querySelector('.arrow.left');
            const rightArrow = document.querySelector('.arrow.right');
            if (leftArrow && rightArrow) {
                leftArrow.addEventListener('click', prevText);
                rightArrow.addEventListener('click', nextText);
            }
        }
    });
})();

// news.js functionality
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = '18dc96d61be96162034e6b2d5d1715f1';
        const apiUrl = `https://gnews.io/api/v4/search?q=AI+automation&lang=en&max=5&token=${apiKey}`;
        const blogSection = document.querySelector('.blog-preview');
        if (!blogSection) return;
        blogSection.innerHTML = '<p>Loading news...</p>';
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                if (!data.articles || !Array.isArray(data.articles) || data.articles.length === 0) {
                    blogSection.innerHTML = '<p>No news articles found at this time.</p>';
                    return;
                }
                blogSection.innerHTML = '';
                data.articles.slice(0, 3).forEach(article => {
                    const articleElement = document.createElement('article');
                    articleElement.classList.add('blog-card');
                    articleElement.innerHTML = `
                        <h3>${article.title || 'No Title'}</h3>
                        <p>${article.description || 'No description available.'}</p>
                        <a href="${article.url}" class="read-more" target="_blank">Read More</a>
                    `;
                    blogSection.appendChild(articleElement);
                });
            })
            .catch(error => {
                blogSection.innerHTML = '<p>Unable to load news at this time. Please try again later.</p>';
                console.error('Error fetching news:', error);
            });
    });
})();

// services.js functionality
(function() {
    document.addEventListener('DOMContentLoaded', function () {
        const carousel = document.querySelector('.carousel-items');
        if (!carousel) return;
        const items = carousel.querySelectorAll('.industry-item');
        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');
        let currentIndex = 0;
        let interval;

        function updateCarousel() {
            items.forEach((item, index) => {
                item.classList.remove('active');
                item.classList.add('hidden');
                if (index >= currentIndex && index < currentIndex + 3) {
                    item.classList.add('active');
                    item.classList.remove('hidden');
                }
            });
        }

        function nextItem() {
            currentIndex = (currentIndex + 1) % items.length;
            if (currentIndex + 3 > items.length) {
                currentIndex = 0;
            }
            updateCarousel();
        }

        function prevItem() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            if (currentIndex < 0) {
                currentIndex = items.length - 3;
            }
            updateCarousel();
        }

        function resetInterval() {
            clearInterval(interval);
            interval = setInterval(nextItem, 15000);
        }

        if (leftArrow && rightArrow && items.length > 0) {
            leftArrow.addEventListener('click', () => {
                prevItem();
                resetInterval();
            });
            rightArrow.addEventListener('click', () => {
                nextItem();
                resetInterval();
            });
            interval = setInterval(nextItem, 15000);
            updateCarousel();
        }
    });
})();
