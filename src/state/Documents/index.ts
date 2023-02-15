import { atom } from 'recoil'
import { File, Folder } from './types'

const documentStoreState = atom<Array<File | Folder>>({
    key: 'DocumentStore',
    default: [],
})

// todo setup selector https://recoiljs.org/docs/basic-tutorial/selectors

export {
    documentStoreState
}