import {ref} from 'vue'
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../configs/FireBaseConfig.ts';

export function useComments() {
    const commentsCount = ref(0);
    const commentsList = ref<any[]>([]);

    const subscribeToCommentsCount = (postId: string) => {
        const q = query(collection(db, "comments"), where("postId", "==", postId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            commentsCount.value = snapshot.size;
            commentsList.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        });

        return unsubscribe;
    };

    return {
        commentsCount,
        commentsList,
        subscribeToCommentsCount
    };
}
