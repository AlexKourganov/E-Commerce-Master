import ShopActionTypes from './shop.types';
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () =>({
    type:ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap =>({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:collectionsMap
});

export const fetchCollectionsFailure = errorMessage =>({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:errorMessage
})

// With thunk any time we attempt to dispatch a function instead of object, the middleware will
// call that function with dispatch method itself as the first argument

export const fetchCollectionsStartAsync = () => {
   
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef
        .get()
        .then(snapshot => {
            
            
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // updateCollections(collectionsMap);
            dispatch(fetchCollectionsSuccess(collectionsMap));
            
          }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}
