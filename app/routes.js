var watson = require('watson-developer-cloud');
var textTranslation = "";


var language_translator = watson.language_translator({
  url: "https://gateway.watsonplatform.net/language-translator/api",
  username: 'ca0e9e32-fad5-44fb-bcd4-f02e5b19528d',
  password: 'SKqBySPZphHk',
  version: 'v2'
});

var tone_analyzer = watson.tone_analyzer({
  username: '257c328b-7704-4ea5-b7b1-9053dd012cd7',
  password: 'AL04Yo00AIse',
  version: 'v3',
  version_date: '2016-05-19'
});

function getTodos(res) {
    // Todo.find(function (err, todos) {

    //     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    //     if (err) {
    //         res.send(err);
    //     }

    //     res.json(todos); // return all todos in JSON format
    // });
};

function textTranslator(userText, res) {
  language_translator.translate({ text: userText, source: 'pt', target: 'en' }, function(err, translation) {
    if(err) {
      console.log(err);
    } else {
      textTranslation = translation.translations[0].translation;
      res.status(200).send(textTranslation);
    }
  });
}

function textAnalyzer() {
  tone_analyzer.tone({ text: textTranslation }, function(err, tone) {
    if (err) {
      console.log(err);
    } else {
      console.log("Traduziu");
      return JSON.stringify(tone, null, 2);
    }
  });
};



module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        textAnalyzer().then(function(data) {
          console.log("Aqui");
          console.log(data);
          res.status(200).send(data);
        }, function(error) {
          console.log(error);
        });
        
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        textTranslator(req.body.text, res);
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        // Todo.remove({
        //     _id: req.params.todo_id
        // }, function (err, todo) {
        //     if (err)
        //         res.send(err);

        //     getTodos(res);
        // });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
