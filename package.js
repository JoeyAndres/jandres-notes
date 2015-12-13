Package.describe({
  name: 'jandres:notes',
  version: '0.1.3',
  // Brief, one-line summary of the package.
  summary: 'Sticky note module for meteor, handling both front-end and back-end (db stuff).',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/JoeyAndres/jandres-notes.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use(['fortawesome:fontawesome@4.5.0', 'blaze-html-templates'], 'client');
  api.use(['mongo', 'iron:router@1.0.12', 'less', 'accounts-base'], ['client', 'server']);

  // lib files (client and server).
  api.addFiles(['lib/lib.js']);

  // Server files.
  api.addFiles([
    'server/publish.js',
    'server/permissions.js',
    'server/login-handler.js'
  ], 'server');

  // Client files.
  api.addFiles('client/styles/jandres-note.less');
  api.addFiles([
    'client/templates/board.html',
    'client/templates/note.html',
    'client/templates/note-entry.html',
    'client/templates/note-plus.html'
  ], 'client');
  api.addFiles([
    'client/lib/subscription.js',
    'client/templates/board.js',
    'client/templates/note-entry.js',
    'client/templates/note-plus.js'
  ], 'client');

  api.export('JandresNotes');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jandres:notes');
  api.addFiles('notes-tests.js');
});
