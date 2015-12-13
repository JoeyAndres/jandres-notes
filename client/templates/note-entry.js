Template.JandresNoteEntry.events({
    "submit #jandres-note-entry-form": function(event) {
        event.preventDefault();  // Prevent submit and cause refresh.

        let textarea_text = event.target.jandres_note_entry_textarea.value;
        let boards = JandresNotes.get_owned_boards();
        JandresNotes.add_note(boards[0]._id, { text: textarea_text });
        this.post_cb();
    }
});