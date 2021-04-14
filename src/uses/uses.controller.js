const uses = require("../data/uses-data");

// function list(req, res) {
//   const { urlId } = req.params;
//   const foundUses = uses.filter((use) => use.urlId === Number(urlId));
//   res.json({ data: foundUses });
// }

function list(req, res) {
  const { urlId } = req.params;
  const filterFunction = urlId ? (use) => use.urlId === Number(urlId) : () => true;
  res.json({ data: uses.filter(filterFunction) });
}

function useIdExists(req, res, next) {
  const { useId } = req.params;
  const foundUseId = uses.find((use) => use.id === Number(useId));
  if (foundUseId) {
    res.locals.useId = foundUseId;
    return next();
  }
  next({
    status: 404,
    message: `Use id not found: ${useId}`,
  });
}

function read(req, res) {
  console.log(req.url);
  res.json({ data: res.locals.useId });
}

function erase(req, res) {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  read: [useIdExists, read],
  delete: [erase],
  list,
};
