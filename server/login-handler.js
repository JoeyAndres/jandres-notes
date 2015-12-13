Accounts.onLogin(function() {
    // Create various collections.
    let user_have_no_boards = JandresNotes.get_owned_boards().length === 0;
    if (user_have_no_boards) {
        JandresNotes.add_board({
            owner_id: Meteor.userId()
        });
    }
});