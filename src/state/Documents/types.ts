interface Document {
    id: string
    name: string
    parentId?: string
}

interface File extends Document {
    type: 'DOCUMENT'
    content: string
}

interface Folder extends Document {
    type: 'FOLDER'
}

export type {
    Document,
    File,
    Folder
}