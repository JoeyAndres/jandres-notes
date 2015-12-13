JandresNotes = {
    CLIENT: {},
    SERVER: {},

    notes: new Mongo.Collection('jandres_notes'),
    boards: new Mongo.Collection('jandres_boards'),

    /**
     * Get the note given a note_id.
     * @param note_id
     */
    get_note: function(note_id) {
        var note = this.notes.findOne({
            _id: note_id
        });
        return note;
    },

    /**
     * Get an array of notes given a board_id.
     * @param board_id
     */
    get_notes: function(board_id) {
        let notes = this.notes.find({
            board_id: board_id
        }).fetch();
        return notes;
    },

    get_owned_notes: function() {
        let boards = this.get_owned_boards();

        if (!!!boards || boards.length === 0) { return []; }
        return this.get_notes(boards[0]._id);
    },

    /**
     * Get the board corresponding to the given board_id.
     * @param board_id
     */
    get_board: function(board_id) {
        let board = this.boards.findOne({
            _id: board_id
        });
        return board;
    },

    get_owned_boards: function() {
        let boards = this.boards.find({
            owner_id: Meteor.userId()
        }).fetch();

        return boards;
    },

    /**
     * Adds notes given board_id
     * @param board_id
     * @param options
     */
    add_note: function(board_id, options) {
        // TODO: validate board_id.

        let new_note = {
            text: options.text || "",
            board_id: board_id
        };
        new_note._id = this.notes.insert(new_note);

        return new_note;
    },

    /**
     * Adds a board.
     */
    add_board: function(options) {
        // TODO: remove owner_id later. Make a function that will make such an optional property.
        let new_board = options;
        new_board._id = this.boards.insert(new_board);

        return new_board;
    }
};