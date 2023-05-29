import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, orderBy as fireBaseOrderBy, query as fireBaseQuery, where } from 'firebase/firestore';

export const useCollection = (collectionInfo, _query, _orderBy) => {
    const [ documents, setDocuments ] = useState(null);
    const [ error, setError ] = useState(null);
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;

    useEffect(() => {
        let ref = collection(db, collectionInfo);

        if (query) {
            ref = fireBaseQuery(ref, where(...query));
        }
        if (orderBy) {
            ref = fireBaseQuery(ref, fireBaseOrderBy(...query));
        }
        const unSub = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id });
            });

            // update state
            setDocuments(results);
            setError(null);
        });
        return () => {
            unSub();
        };
    }, [ collectionInfo ]);

    return { documents, error };

};