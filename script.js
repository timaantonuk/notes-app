'use strict';

const mainContainer = document.querySelector('.main__container');
const createBtn = document.querySelector('.header__btn');
let notesCounter = document.querySelector('.header__counter');


function updateNotesCounter() {
    notesCounter.innerText = `Notes amount: ${mainContainer.childElementCount}`;
}


function updateStorage() {
    localStorage.setItem('notes', mainContainer.innerHTML);
}


function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        mainContainer.innerHTML = savedNotes;
    }
    updateNotesCounter();
    mainContainer.querySelectorAll('.main__note img').forEach(img => {
        img.addEventListener('click', handleDeleteNote);
    });

}


function handleDeleteNote(e) {
    e.target.parentElement.remove();
    updateNotesCounter();
    updateStorage();
}





createBtn.addEventListener('click', () => {
    let note = document.createElement('p');
    let img = document.createElement('img');
    note.className = 'main__note';
    note.setAttribute('contenteditable', 'true');
    note.setAttribute('data-placeholder', 'Your note...');
    img.src = 'images/delete.png';
    note.appendChild(img);
    mainContainer.appendChild(note);
    updateNotesCounter();



    updateStorage();
});


window.addEventListener('DOMContentLoaded', loadNotes);


mainContainer.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        handleDeleteNote(e);
    }
});