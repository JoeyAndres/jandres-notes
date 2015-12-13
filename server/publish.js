Meteor.publish("jandres_owned_boards", function () {
    let boards_cursor = JandresNotes.boards.find({
        owner_id: this.userId
    });

    if (!boards_cursor) {
        return [];
    }

    return boards_cursor;
});

Meteor.publish("jandres_owned_notes", function () {
    let boards_cursor = JandresNotes.boards.find({
        owner_id: this.userId
    }).fetch();

    if (!boards_cursor || boards_cursor.length === 0) {
        return [];
    }

    let board_id = boards_cursor[0]._id;

    return JandresNotes.notes.find({
        board_id: board_id
    });
});