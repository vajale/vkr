import { getDatabase, ref, onValue } from "firebase/database";

export const useFirebaseData = () => {

    const db = getDatabase();
    const starCountRef = ref(db, 'user/' + 'C6OzASISjjnSetUe2iXb');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
    });

}