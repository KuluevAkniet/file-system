const fileRepository = require('../repository/file.repository');
const { readFile, writeFile } = require('../lib/adapter');

class FileService {
    constructor() {
    }
    
    async GetAllFiles() {
        const result = await fileRepository.findAllFiles();
        console.log("getAllFiles", result);
        return result;
    }
    
    async GetFile(filename) {
        try {
            const result = await fileRepository.findFile(filename);
            if(result) {
                return await readFile(filename);
            }
            return null;
        } catch(e) {
            throw new Error("Error while getting file");
        }
    }
    
    async PostFile(data) {
        try {
            const result = await writeFile(data.fileName, data.buffer);
            console.log('result writeStream: ', result);
        } catch(e) {
            console.log("Error, file hasn't been written");
        }
        const newFile = {
            filename: data.fileName,
            mimeType: data.mimeType,
            size: data.size
        }
        
        const fileAlreadyExists = await fileRepository.findFile(data.fileName);
        
        if(fileAlreadyExists?.filename) {
            return await fileRepository.updateFile(data?.fileName, newFile);
        }
        return await fileRepository.insertFile(newFile);
    }
    
    async DeleteFiles(query) {
        if(query.filename) {
            const filename = query.filename;
            return await fileRepository.deleteFiles(filename);
        }
        return `Provide filename`;
    }
    
}

module.exports = new FileService();
