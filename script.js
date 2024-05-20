document.addEventListener("DOMContentLoaded", () => {
    const addBox = document.querySelector(".add-box"),
        popupBox = document.querySelector(".popup-box"),
        popupTitle = popupBox.querySelector("header p"),
        closeIcon = popupBox.querySelector("header i"),
        titleTag = popupBox.querySelector("input"),
        descTag = popupBox.querySelector("textarea"),
        addBtn = popupBox.querySelector("button");

    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    let notes = [];
    try {
        notes = JSON.parse(localStorage.getItem("notes")) || [];
    } catch (e) {
        notes = [];
    }
    let isUpdate = false, updateId;

    addBox.addEventListener("click", () => {
        popupTitle.innerText = "Add a new Note";
        addBtn.innerText = "Add Note";
        popupBox.classList.add("show");
        document.querySelector("body").style.overflow = "hidden";
        if (window.innerWidth > 660) titleTag.focus();
    });

    closeIcon.addEventListener("click", () => {
        isUpdate = false;
        titleTag.value = descTag.value = "";
        popupBox.classList.remove("show");
        document.querySelector("body").style.overflow = "auto";
    });

    function showNotes() {
        if (!notes) return;
        document.querySelectorAll(".note").forEach(li => li.remove());
        notes.forEach((note, id) => {
            let filterDesc = note.description.replace(/\n/g, '<br/>');
            let liTag = document.createElement('li');
            liTag.className = 'note';
            liTag.innerHTML = `<div class="details">
                                    <p>${note.title}</p>
                                    <span>${filterDesc}</span>
                                </div>
                                <div class="bottom-content">
                                    <span>${note.date}</span>
                                    <div class="settings">
                                        <i class="uil uil-ellipsis-h"></i>
                                        <ul class="menu">
                                            <li><i class="uil uil-pen"></i>Edit</li>
                                            <li><i class="uil uil-trash"></i>Delete</li>
                                        </ul>
                                    </div>
                                </div>`;

            // Add event listeners for the menu, edit, and delete buttons
            liTag.querySelector('.uil-ellipsis-h').addEventListener('click', function() {
                showMenu(this);
            });
            liTag.querySelector('.uil-pen').parentElement.addEventListener('click', function() {
                updateNote(id, note.title, note.description.replace(/<br\/>/g, '\n'));
            });
            liTag.querySelector('.uil-trash').parentElement.addEventListener('click', function() {
                deleteNote(id);
            });

            addBox.insertAdjacentElement("afterend", liTag);
        });
    }
    showNotes();

    function showMenu(elem) {
        elem.parentElement.classList.add("show");
        const handleClickOutside = (e) => {
            if (e.target.tagName != "I" || e.target != elem) {
                elem.parentElement.classList.remove("show");
                document.removeEventListener("click", handleClickOutside);
            }
        };
        document.addEventListener("click", handleClickOutside);
    }

    function deleteNote(noteId) {
        let confirmDel = confirm("Are you sure you want to delete this note?");
        if (!confirmDel) return;
        notes.splice(noteId, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
    }

    function updateNote(noteId, title, description) {
        updateId = noteId;
        isUpdate = true;
        addBox.click();
        titleTag.value = title;
        descTag.value = description;
        popupTitle.innerText = "Update a Note";
        addBtn.innerText = "Update Note";
    }

    addBtn.addEventListener("click", e => {
        e.preventDefault();
        let title = titleTag.value.trim(),
            description = descTag.value.trim();

        if (title || description) {
            let currentDate = new Date(),
                month = months[currentDate.getMonth()],
                day = currentDate.getDate(),
                year = currentDate.getFullYear();

            let noteInfo = {title, description, date: `${month} ${day}, ${year}`}
            if (!isUpdate) {
                notes.push(noteInfo);
            } else {
                isUpdate = false;
                notes[updateId] = noteInfo;
            }
            localStorage.setItem("notes", JSON.stringify(notes));
            showNotes();
            closeIcon.click();
        }
    });


    const themeSwitcherBtn = document.querySelector(".theme-switcher");
    const themeSwitcherImg = document.querySelector(".theme-switcher-img");

    themeSwitcherBtn.addEventListener("click", toggleTheme);

    function toggleTheme() {
        const currentIcon = themeSwitcherImg.src.split('/').pop();

        if (currentIcon === 'sun.png') {
            document.documentElement.style.setProperty('--background-color', '#000000');
            document.documentElement.style.setProperty('--theme-switcher', '#FFFFFF');
            themeSwitcherImg.src = './images/moon.png';
        } else {
            document.documentElement.style.setProperty('--background-color', '#935ecc');
            document.documentElement.style.setProperty('--theme-switcher', '#000000');
            themeSwitcherImg.src = './images/sun.png';
        }

        console.log(themeSwitcherImg.src.split('/').pop());
    }

    themeSwitcherBtn.addEventListener('click', toggleTheme);

});
