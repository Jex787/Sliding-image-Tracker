const track = document.getElementById('image-track');
let isDragging = false;

const startDragging = (clientX) => {
    track.dataset.mouseDownAt = clientX;
    isDragging = true;
};

const stopDragging = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
    isDragging = false;
};

const moveDragging = (clientX) => {
    if (!isDragging) return;

    let mouseDelta;
    if (window.innerWidth <= 768) {
        mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX;
    } else {
        mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX;
    }

    const maxDelta = window.innerWidth / 2;

    let percentage;
    if (window.innerWidth <= 768) {
        percentage = (mouseDelta / window.innerHeight) * -100;
    } else {
        percentage = (mouseDelta / maxDelta) * -100;
    }

    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    // Limiting the range of nextPercentage
    if (window.innerWidth <= 768) {
        nextPercentage = Math.min(nextPercentage, 0);
        nextPercentage = Math.max(nextPercentage, -100);
    } else {
        nextPercentage = Math.min(nextPercentage, 0);
        nextPercentage = Math.max(nextPercentage, -300);
    }

    track.dataset.percentage = nextPercentage;

    if (window.innerWidth <= 768) {
        track.style.transform = `translate(-50%, ${nextPercentage}%)`;
    } else {
        track.style.transform = `translate(${nextPercentage}%, -50%)`;
    }

    for (const image of track.getElementsByClassName('image')) {
        if (window.innerWidth <= 768) {
            image.style.objectPosition = `center ${100 + nextPercentage}%`;
        } else {
            image.style.objectPosition = `${100 + nextPercentage}% center`;
        }
    }
};

track.addEventListener('mousedown', (e) => startDragging(e.clientX));
window.addEventListener('mouseup', stopDragging);
window.addEventListener('mousemove', (e) => moveDragging(e.clientX));

// Touch events
track.addEventListener('touchstart', (e) => startDragging(e.touches[0].clientX));
window.addEventListener('touchend', stopDragging);
window.addEventListener('touchmove', (e) => moveDragging(e.touches[0].clientX));