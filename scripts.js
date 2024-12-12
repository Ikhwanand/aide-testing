// Get notes from localStorage or initialize empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let selectedNoteId = null;

// Function to save notes to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to add a new note
function addNote() {
  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Please fill in both title and content!");
    return;
  }

  const note = {
    id: Date.now(),
    title: title,
    content: content,
    date: new Date().toLocaleString(),
  };

  notes.push(note);
  saveNotes();
  displayNotes();

  // Clear inputs
  titleInput.value = "";
  contentInput.value = "";
}

// Function to delete a note
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  displayNotes();
}

// Function to edit note

function editNote(id) {
  selectedNoteId = id;
  const note = notes.find((note) => note.id === id);

  document.getElementById("note-title").value = note.title;
  document.getElementById("note-content").value = note.content;

  document.getElementById("add-btn").style.display = "none";
  document.getElementById("update-btn").style.display = "inline-block";
}

// Function to update note
function updateNote() {
  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Please fill in both title and content!");
    return;
  }

  const noteIndex = notes.findIndex((note) => note.id === selectedNoteId);
  if (noteIndex > -1) {
    notes[noteIndex].title = title;
    notes[noteIndex].content = content;
    notes[noteIndex].date = new Date().toLocaleString();

    saveNotes();
    displayNotes();

    // Reset form
    titleInput.value = "";
    contentInput.value = "";
    selectedNoteId = null;

    document.getElementById("add-btn").style.display = "inline-block";
    document.getElementById("update-btn").style.display = "none";
  }
}

// Function to display all notes
function displayNotes() {
  const notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
            <div class="note-buttons">
                <button class="delete-btn" onclick="deleteNote(${note.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
                <button class="edit-btn" onclick="editNote(${note.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
                <button class="export-btn" onclick="exportNote(${note.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
</svg></button>
            </div>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>${note.date}</small>
        `;
    notesContainer.appendChild(noteElement);
  });
}

// Function to download notes as text file
function downloadNotes() {
  if (notes.length === 0) {
    alert("No notes to export!");
    return;
  }

  let textContent = "My Notes\n\n";
  notes.forEach((note) => {
    textContent += `Title: ${note.title}\n`;
    textContent += `Date: ${note.date}\n`;
    textContent += `Content: ${note.content}\n`;
    textContent += "------------------------\n\n";
  });

  const blob = new Blob([textContent], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my_notes.txt";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// Function to export single note
function exportNote(id) {
  const note = notes.find((note) => note.id === id);
  if (!note) return;

  let textContent = "My Note\n\n";
  textContent += `Title: ${note.title}\n`;
  textContent += `Date: ${note.date}\n`;
  textContent += `Content: ${note.content}\n`;

  const blob = new Blob([textContent], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `note_${note.title.toLowerCase().replace(/\s+/g, "_")}.txt`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// Display notes when page loads
displayNotes();
