const { Presentation } = require('../models');

const randomString = (length = 16) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports.index = async (req, res) => {
    const presentations = await Presentation
        .find()
        .sort({ updated: -1 })
        .select({ key: true, created: true, updated: true })
        .exec();

    res.json(presentations);
};

module.exports.show = async (req, res) => {
    const presentation = await Presentation
        .findOne({ key: req.params.id })
        .select({ key: true, content: true, created: true, updated: true })
        .exec();

    res.json(presentation);
};

module.exports.create = async (req, res) => {
    const presentation = await Presentation.create({ key: randomString(), content: '# Hello World!\n' });
    res.json(presentation);
};