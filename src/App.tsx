import React from 'react';
import { useRecoilState } from 'recoil'
import { documentStoreState } from './state/Documents'
import { v4 } from "uuid"

function App() {
  const [ documentList, setDocuments ] = useRecoilState(documentStoreState);

  return (
   <>
     <button
          onClick={(_) => {
            setDocuments([...documentList, { id: v4(), name: 'test', type: 'FOLDER' }]);
          }}
        >
          Add Document
        </button>
    {documentList.map((document) => (
        <>{document.name}</>
      ))}
   </>
  );
}

export default App;
