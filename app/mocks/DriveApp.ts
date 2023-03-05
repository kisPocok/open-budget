class DriveBlob {
    content: string

    constructor(s: string) {
        this.content = s
    }
    getDataAsString() {
        return this.content
    }
}

class DriveFile {
    fakeContent: string

    constructor(fakeContent: string) {
        this.fakeContent = fakeContent
    }
    getBlob() {
        return new DriveBlob(this.fakeContent)
    }
}

class FileIterator {
    getContinuationToken() {
        return ''
    }
    hasNext() {
        return false
    }
    next() {
        return new DriveFile('Hello world!')
    }
}

class MockDriveApp {
    getFilesByName(filename: string) {
        return new FileIterator()
    }
}

export { DriveBlob, DriveFile, FileIterator, MockDriveApp }
