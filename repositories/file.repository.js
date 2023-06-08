const dbo = require('../database/connect.db');

class FileRepository {
    
    constructor() {};
    
    async FindFile(filename) {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .findOne({filename});
        return result;
    }
    
    async FindAllFiles() {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .find({});
        return result;
    }
    
    async InsertFile(newFile) {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .insertOne(newFile);
        return result;
    }
    
    async UpdateFile(filename, newFile) {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .updateOne(
                { filename },
                {
                    $set: newFile
                }
            );
        return result;
    }
    
    async DeleteFiles(filename) {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .deleteMany({filename});
        return result;
    }
    
}

module.exports = new FileRepository();
