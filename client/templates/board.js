Template.JandresBoard.onCreated(function() {
    this.show_note_entry = new ReactiveVar(false);
});

Template.JandresBoard.helpers({
    notes: function() {
        return JandresNotes.get_owned_notes().reverse();
    },

    show_note_entry: function() {
        return Template.instance().show_note_entry.get();
    },

    note_plus_click_cb: function() {
        let show_note_entry_reactive = Template.instance().show_note_entry;
        return function() {
            show_note_entry_reactive.set(true);
        }
    },

    note_post_click_cb: function() {
        let show_note_entry_reactive = Template.instance().show_note_entry;
        return function() {
            show_note_entry_reactive.set(false);
        }
    }
});

Template.JandresBoard.events({

});