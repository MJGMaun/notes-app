const fs = require('fs');
const chalk = require('chalk');

const getNotes = function() {
    return "Your notes...";
}

const addNote = function(title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.filter(function(note){
        return note.title === title
    })

    if (duplicateNote.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse.bold('Success!'), 'New note added')
    } else {
        console.log(chalk.red.inverse.bold('Error!'), 'Duplicate note')
    }

}

const removeNote = function(title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note){
        return note.title !== title // pag false, it will remove it on array. if true, stay on object
    })

    if (notes.length === 0 || (notes.length === notesToKeep.length)) {
        console.log(chalk.red.inverse.bold('Error!'), 'No note found title: ', title)
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse.bold('Success!'), 'Note removed')
    }

}

const loadNotes = function() {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (error) {
        return []
    }
}

const saveNotes = function(notes) {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {
    addNote,
    removeNote,
    loadNotes
}