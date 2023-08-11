const express =  require('express');
const path =  require('path');

const resourcePath = path.join(__dirname, '../../renderer', 'superpowered-lib')
const port = process.argv[2];
console.log("🚀 ~ file: main.js:5 ~ resourcePath:", resourcePath)

const expressApp = express();
expressApp.use(express.static(resourcePath));
expressApp.listen(port, () => {
  console.debug(`Superpowered library is being served on port ${port}`);
});
