const path = require('path');
const { createWriteStream } = require('fs');
const helper = require('./prebuild-about-helper.js');
const packageUI = helper.getPackageJson();

const aboutPath = path.join(__dirname, '..', '..', '..', '..', 'src', 'assets', 'about.data.json');
const writeStream = createWriteStream(aboutPath);

const deps = (p) => {
  return Object.keys(p.dependencies).map((key) => {
    const packageJsonDependencies = require(path.join(__dirname, '..', '..', '..', '..', 'node_modules', key, '/package.json'));
    return {
      name: key,
      version: packageJsonDependencies.version,
      license: packageJsonDependencies.license || 'not specified'
    };
  });
};

const libraries = helper.removeDuplicates([...deps(packageUI)].sort(helper.dynamicSort('name')));

const aboutData = {
  libraries,
  version: helper.getVersion(),
  releasedate: helper.getReleaseDate(),
  author: helper.getCompany(),
  product: helper.getDescription()
};

writeStream.write(JSON.stringify(aboutData), (error) => (error ? console.log(error) : null));
