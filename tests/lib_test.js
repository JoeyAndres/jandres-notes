let user_1 = "joeshmoe_1";
let user_2 = "joeshmoe_2";
let board_1 = { owner_id: user_1 };
let board_2 = { owner_id: user_2 };
let boards = [];

let note_1 = { text: "test 1", board_id: board_1._id };
let note_2 = { text: "test 2", board_id: board_1._id };
let note_3 = { text: "test 3", board_id: board_2._id };
let note_4 = { text: "test 4", board_id: board_2._id };
let notes = [];

let setup = function() {
    board_1._id = JandresNotes.boards.insert(board_1);
    board_2._id = JandresNotes.boards.insert(board_2);
    boards = [ board_1, board_2 ];

    note_1.board_id = board_1._id;
    note_2.board_id = board_1._id;
    note_3.board_id = board_2._id;
    note_4.board_id = board_2._id;

    note_1._id = JandresNotes.notes.insert(note_1);
    note_2._id = JandresNotes.notes.insert(note_2);
    note_3._id = JandresNotes.notes.insert(note_3);
    note_4._id = JandresNotes.notes.insert(note_4);
    notes = [ note_1, note_2, note_3, note_4 ];
};

let tear_down = function() {
    JandresNotes.boards.remove({});
    JandresNotes.notes.remove({});
};

Tinytest.add('JandresNotes.get_note()', function (test) {
    setup();
    let test_fn = function(note) {
        let result = JandresNotes.get_note(note._id);
        test.equal(result, note);
    };
    notes.forEach(note => test_fn(note));
    tear_down();
});

Tinytest.add('JandresNotes.get_notes()', function (test) {
    setup();
    let result_notes_1 = JandresNotes.get_notes(board_1._id);
    test.equal(result_notes_1, [note_1, note_2]);

    let result_notes_2 = JandresNotes.get_notes(board_2._id);
    test.equal(result_notes_2, [note_3, note_4]);
    tear_down();
});

Tinytest.add('JandresNotes.get_owned_notes()', function (test) {
    setup();
    Meteor.userId = () => user_1;
    let result_notes_1 = JandresNotes.get_owned_notes();
    test.equal(result_notes_1, [note_1, note_2]);

    Meteor.userId = () => user_2;
    let result_notes_2 = JandresNotes.get_owned_notes();
    test.equal(result_notes_2, [note_3, note_4]);
    tear_down();
});

Tinytest.add('JandresNotes.get_board()', function(test) {
    setup();
    let result_1 = JandresNotes.get_board(board_1._id);
    test.equal(result_1, board_1);

    let result_2 = JandresNotes.get_board(board_2._id);
    test.equal(result_2, board_2);
    tear_down();
});

Tinytest.add('JandresNotes.get_owned_boards()', function(test) {
    setup();
    Meteor.userId = () => user_1;
    let result_1 = JandresNotes.get_owned_boards(user_1);
    test.equal(result_1, [board_1]);

    Meteor.userId = () => user_2;
    let result_2 = JandresNotes.get_owned_boards(user_2);
    test.equal(result_2, [board_2]);
    tear_down();
});

Tinytest.add('JandresNotes.add_note()', function(test) {
    setup();
    let new_note = { text: "test 5" };
    let new_note_final = JandresNotes.add_note(board_1._id, new_note);
    test.equal(new_note_final.text, new_note.text);
    test.isNotNull(new_note_final._id, "New note didn't get a new id upon insertion");
    test.isNotUndefined(new_note_final._id, "New note didn't get a new id upon insertion");

    let board_1_notes = JandresNotes.get_notes(board_1._id);
    test.length(board_1_notes, 3);
    let new_note_exist = !!board_1_notes.find(note => note._id === new_note_final._id);
    test.equal(new_note_exist, true);
    tear_down();
});

Tinytest.add('JandresNotes.add_board()', function(test) {
    setup();
    let new_board = { owner_id: user_1 };
    let new_board_final = JandresNotes.add_note(board_1._id, new_board);
    test.equal(new_board_final.owner_id, new_board.text);
    test.isNotNull(new_board_final._id, "New board didn't get a new id upon insertion");
    test.isNotUndefined(new_board_final._id, "New board didn't get a new id upon insertion");
    tear_down();
});