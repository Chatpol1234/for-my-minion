// PAGE NAVIGATION
function nextPage(pageNumber) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  document.getElementById(`page${pageNumber}`).classList.add('active');
}

// POPUPS
let targetPageNumber = null; // Keeps track of which page to load next

function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

// UPDATED: Dynamically changes the image based on the page destination
function openCorrectPopup(pageNumber) {
  targetPageNumber = pageNumber; // Remember the page we want to go to
  
  // Find the image element inside the correct popup
  const popupImg = document.getElementById('correct-popup-img');
  
  // Change its source to point to the correct image (e.g., images/correct3.jpg)
  popupImg.src = `images/correct${pageNumber}.jpg`;
  
  openPopup('popup-correct'); // Show the popup
}

function proceedToNextPage() {
  if (targetPageNumber !== null) {
    closePopup('popup-correct'); // Close the popup
    nextPage(targetPageNumber);  // Advance to the saved page number
  }
}

// PUZZLE
const puzzleBoard = document.getElementById('puzzle-board');

let pieces = [];

for (let i = 0; i < 9; i++) {
  pieces.push(i);
}

pieces.sort(() => Math.random() - 0.5);

pieces.forEach(pieceIndex => {
  const piece = document.createElement('div');

  piece.classList.add('puzzle-piece');
  piece.draggable = true;
  piece.dataset.index = pieceIndex;

  const x = (pieceIndex % 3) * 200;
  const y = Math.floor(pieceIndex / 3) * 200;

  piece.style.backgroundPosition = `-${x}px -${y}px`;

  puzzleBoard.appendChild(piece);
});

let draggedPiece = null;

puzzleBoard.addEventListener('dragstart', (e) => {
  draggedPiece = e.target;
});

puzzleBoard.addEventListener('dragover', (e) => {
  e.preventDefault();
});

puzzleBoard.addEventListener('drop', (e) => {
  if (e.target.classList.contains('puzzle-piece')) {

    const tempBackground = draggedPiece.style.backgroundPosition;
    const tempIndex = draggedPiece.dataset.index;

    draggedPiece.style.backgroundPosition = e.target.style.backgroundPosition;
    draggedPiece.dataset.index = e.target.dataset.index;

    e.target.style.backgroundPosition = tempBackground;
    e.target.dataset.index = tempIndex;
  }
});