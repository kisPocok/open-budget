class Blob {
    constructor(str) {
        this.content = str;
    }
    getDataAsString() { return this.content; }
}

class File {
    constructor(fakeContent) {
        this.fakeContent = fakeContent;
    }
    getBlob() {
        return new Blob(this.fakeContent);
    }
}

class FileIterator {
    getContinuationToken() { return ""; }
    hasNext() { return false; }
    next() { return new File("Hello world!"); }
}

class DriveApp {
    getFilesByName() { return new FileIterator(); }
}

module.exports = {
   Blob, File, FileIterator, DriveApp
};
