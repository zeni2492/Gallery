import {ref} from 'vue'
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../configs/FireBaseConfig.ts';

export function useComments() {
    const commentsCount = ref(0);
    const commentsList = ref<any[]>([]);

    const subscribeToCommentsCount = (postId: string) => {
        const q = query(collection(db, "comments"), where("postId", "==", postId));

        return  unsubscribe = onSnapshot(q, (snapshot) => {
            commentsCount.value = snapshot.size;
            commentsList.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        });
    };

    return {
        commentsCount,
        commentsList,
        subscribeToCommentsCount
    };
}
