
const async = require('async');
const fs = require('fs');

const config = require('../../config.json');

let configRoot;
switch (process.platform) {
  case 'darwin':
    configRoot = config.darwin;
    break;
  case 'linux':
    configRoot = config.linux;
    break;
  case 'win32':
    configRoot = config.win32;
    break;
}
const readRoot = configRoot.readRoot;
const readRootLength = readRoot.length;
const dataRoot = configRoot.dataRoot;

function getOrderedFileList(fileList, listFolder) {
  const dirs = [];
  const files = [];
  function sep(element) {
    const filePath = `${listFolder}/${element}`;
    if (fs.statSync(filePath).isDirectory()) {
      dirs.push(element);
    } else {
      files.push(element);
    }
  }
  fileList.forEach(sep);
  dirs.sort();
  files.sort();
  const outDir = dirs.concat(files);
  return outDir;
}

module.exports = function (readTreeDone) {
  function isDirOk(fileName) {
    let returnIt;
    switch (fileName) {
      case 'node_modules':
      case 'ui-dist':
      case '.git':
        returnIt = false;
        break;
      default:
        returnIt = true;
    }
    return returnIt;
  }

  function isFileOk(fileName) {
    let returnIt;
    if (fileName.endsWith('.js')) returnIt = true;
    else if (fileName.endsWith('.jsx')) returnIt = true;
    else if (fileName.endsWith('.json')) returnIt = true;
    else if (fileName.endsWith('.html')) returnIt = true;
    else if (fileName.endsWith('.css')) returnIt = true;
    else if (fileName.endsWith('.md')) returnIt = true;
    else returnIt = false;
    return returnIt;
  }

  function getFileList(listFolder, getFileListDoneCB) {
    const fileListReturned = [];

    function eachFileNameAction(fileName, eachFileNameDoneCB) {
      const filePath = listFolder + fileName;
      const addToList = function (newRecord) {
        fileListReturned.push(newRecord);
        return eachFileNameDoneCB();
      };

      fs.stat(filePath, (err, stats) => {
        const relPath = listFolder.substr(readRootLength);
        const nodeid = relPath + fileName;
        const currentRecord = {
          children: [],
          nodeid,
          title: fileName,
        };
        const handleDirReturn = function (dirList) {
          if (dirList.length > 0) {
            currentRecord.children = dirList;
            currentRecord.closed = true;
            addToList(currentRecord);
          } else {
            return eachFileNameDoneCB();
          }
        };
        if (err) throw err;
        else if (stats.isDirectory()) {
          if (isDirOk(fileName)) getFileList(`${filePath}/`, handleDirReturn);
          else return eachFileNameDoneCB();
        } else if (stats.isFile()) {
          if (isFileOk(fileName)) addToList(currentRecord);
          else return eachFileNameDoneCB();
        } else return eachFileNameDoneCB();
      });
    }

    function eachFileNameActionDone(err) {
      if (err) console.log('eachFileNameActionDone error');
      else getFileListDoneCB(fileListReturned);
    }

    function getFileListCallBack(err, fileList) {
      if (err) console.log(`getFileListCallBack error: ${listFolder}`);
      else {
        const orderedFileList = getOrderedFileList(fileList, listFolder);
        async.eachSeries(orderedFileList, eachFileNameAction, eachFileNameActionDone);
      }
    }

    const start = function () {
      fs.readdir(listFolder, getFileListCallBack);
    };

    start();
  }

  function getFileListDone(fileList) {
    const filePath = `${dataRoot}/FileTree.json`;
    function writeFileCallBack(err) {
      if (err) console.log('error saving FileTree');
      console.log('FileTree saved');
      return readTreeDone();
    }
    fs.writeFile(filePath, JSON.stringify(fileList, null, 2), writeFileCallBack);
  }

  getFileList(readRoot, getFileListDone);
};

// module.exports.readTree = readTree;
