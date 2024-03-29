const fileService = require('../services/file.service');

class FileController {
  constructor() {}
  
  async GetAllFilesFromMongo(req, res) {
    try {
      const result = await fileService.GetAllFiles();
      res.send(result);
    } catch(e) {
      res.status(500).json(e);
    }
  }
  
  async GetFile(req, res, next) {
    try {
      const result = await fileService.GetFile(req.params.filename);
      if(result) {
        return result.pipe(res);
      }
      res.send(`There is no such a file`);
    } catch(e) {
      // res.status(500).json(e);
      next(e);
    }
  }
  
  async PostFile(req, res) {
    try {
      const data = { ...req.files };
      console.log("data", data);
      const result = await fileService.PostFile(data);
      return res.send(result);
    } catch(e) {
      res.status(500).json(e);
    }
  }
  
  async DeleteFiles(req, res) {
    try {
      const result = await fileService.deleteFiles(req.query);
      res.send(result);
    } catch(e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new FileController();
