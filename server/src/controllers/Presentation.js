const randomString = (length = 8) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const index = () => {
    return [
        { id: '12345678x' },
        { id: '12345678y' },
    ];
};

const show = (request) => {
    return {
        id: request.params.id,
    };
};

const create = () => {
    return {
        id: randomString(),
        content: '# Hello World!\n',
    };
};

module.exports = { index, show, create };