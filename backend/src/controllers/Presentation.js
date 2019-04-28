const { Presentation } = require('../models');

const randomString = (length = 16) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports.index = async (req, res) => {
    const presentations = await Presentation.list();
    res.json(presentations);
};

module.exports.show = async (req, res) => {
    const presentation = await Presentation.findByKey(req.params.id);
    if (!presentation) {
        res.sendStatus(404);
    }
    res.json(presentation);
};

module.exports.update = async (req, res) => {
    const key = req.params.id;
    const presentation = await Presentation.findByKey(key);
    presentation.content = req.body.content;
    await presentation.save();

    res.json(presentation);
};

module.exports.create = async (req, res) => {
    const presentation = await Presentation.create({
        key: randomString(),
        content: '# Hello World!\n'
    });

    res.json(presentation);
};