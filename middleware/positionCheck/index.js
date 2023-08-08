module.exports.positionCheck = (...args) => {
  console.log(args);
  return (req, res, next) => {
    const gotValue = args.includes(req.user?.others?.position);
    console.log(gotValue);
    if (!gotValue) {
      res.send("you have no access to this position");
    }
    next();
  };
};
