const Express = require('express');
const Router = Express.Router();
const db = require('../models/tasks');

Router.post('/', (req, res) => {
  let task = new db();
  task.name = req.body.name;
  task.author = req.body.author;
  task.description = req.body.description;

  task.save( err => {
    if(err)
      res.send(err);
    res.status(200).send({'success': true});
  });
});

Router.get('/', (req, res) => {
  db.find( (err, tasks) => {
    if(err)
      return res.send(err);
    return res.send(tasks);
  });
});

Router.put('/:id', (req, res) => {
  db.findById(req.params.id, (err, task) => {
    console.log(req.body);
    task.name = req.body.name;
    task.author = req.body.author;
    task.description = req.body.description;

    task.save(function(err){
      if (err)
        res.send(err);
      return res.json({message: 'Task Updated'});
    });
  });
});

Router.delete('/tasks/:id', (req, res) => {
  db.remove({
    _id: req.params.id
  })
  .then(_ => {
    return res.send({'success': true});
  })
  .catch( err => {
    return res.send({'success': false});
  });
});

module.exports = Router;