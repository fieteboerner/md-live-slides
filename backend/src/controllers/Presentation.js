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
    const attributes = {
        ...req.body,
        updatedAt: new Date,
    };
    const presentation = await Presentation
        .findOneAndUpdate({ key: req.params.id }, attributes, { new: true })
        .select({ key: true, content: true, createdAt: true, updatedAt: true })
        .exec();

    res.json(presentation);
};

module.exports.create = async (req, res) => {
    const presentation = await Presentation.create({
        key: randomString(),
        content: '# Hello World!\n'
    });

    res.json(presentation);
};