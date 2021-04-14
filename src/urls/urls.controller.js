const urls = require("../data/urls-data");

function list(req, res) {
  res.json({ data: urls });
}

let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);

function bodyHasProperty(req, res, next) {
  const { data: { href } = {} } = req.body;
  if (href) {
    return next();
  }
  next({
    status: 400,
    message: "A 'href' property is required",
  });
}

function create(req, res, next) {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    href: href,
    id: ++lastUrlId,
  };
  console.log(newUrl);
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function urlExists(req, res, next) {
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `Url id not found ${urlId}`,
  });
}

function read(req, res) {
  console.log(req.originalUrl);
  res.json({ data: res.locals.url });
}

function update(req, res) {
  const url = res.locals.url;
  const originalUrl = url.href;

  const { data: { href } = {} } = req.body;

  if (originalUrl !== href) {
    url.href = href;
  }

  res.status(200).json({ data: url });
}

function erase(req, res) {
  const { urlId } = res.params;
  const index = urls.findIndex((url) => url.id === Number(urlId));
  if (index > -1) {
    urls.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  create: [bodyHasProperty, create],
  read: [urlExists, read],
  update: [urlExists, bodyHasProperty, update],
  delete: [urlExists, erase],
  list,
  urlExists,
};
