import { useEffect, useReducer, useState } from 'react';
import { db } from '../firebase/config';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null };
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null };
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload };
        default:
            return state;
    }
};

export const useFirestore = (collectionInfo) => {
    const [ response, dispatch ] = useReducer(firestoreReducer, initialState);
    const [ isCancelled, setIsCancelled ] = useState(false);

    let ref = collection(db, collectionInfo);

    // only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    };

    // add a document
    const addDocument = async (pathFragment, doc) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            // const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await addDoc(ref, { ...doc });
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
        }
    };

    // set a document - This would replace the existing document
    const setDocument = async (pathFragment, documentToBeAdded, merge = false) => {
        dispatch({ type: 'IS_PENDING' });
        try {
            const addedDocument = await setDoc(doc(ref, pathFragment), documentToBeAdded, { merge });
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
        }
    };

    // delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });
        const docRef = doc(db, collectionInfo, id);
        try {
            await deleteDoc(docRef);
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' });
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, setDocument, deleteDocument, response };

};
