const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse.bold('-- Your notes --'));
    notes.forEach((note) => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.blue.underline.inverse.bold(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse.bold('No note found!'));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title )
    debugger
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

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title ) // pag false, it will remove it on array. if true, stay on object

    if (notes.length === 0 || (notes.length === notesToKeep.length)) {
        console.log(chalk.red.inverse.bold('Error!'), 'No note found title: ', title)
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse.bold('Success!'), 'Note removed')
    }

}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {
    listNotes,
    readNote,
    addNote,
    removeNote,
    loadNotes
}