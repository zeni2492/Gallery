import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../configs/FireBaseConfig.ts'
import { collection, query, where, getDocs, and } from 'firebase/firestore'
import type {ImageCardData} from "../Types/CardType.ts";

export const useSearchStore = defineStore('search', () => {
    const searchResults = ref<ImageCardData[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const searchCards = async (searchTerm: string, activeCategories: string[] = []) => {
        loading.value = true
        error.value = null
        searchResults.value = []

        try {
            const cardsRef = collection(db, 'Cards')
            const conditions = []

            const trimmedTerm = searchTerm.trim()
            if (trimmedTerm) {
                const searchTermLower = trimmedTerm.toLowerCase()
                conditions.push(where('titleLower', '>=', searchTermLower))
                conditions.push(where('titleLower', '<=', searchTermLower + '\uf8ff'))
            }

            if (activeCategories.length > 0) {
                conditions.push(where('tags', 'array-contains-any', activeCategories))
            }

            let q
            if (conditions.length === 0) {
                q = query(cardsRef)
            } else {
                q = query(cardsRef, and(...conditions))
            }

            const querySnapshot = await getDocs(q)
            searchResults.value = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        } catch (err) {
            error.value = 'Ошибка при выполнении поиска'
            console.error('Search error:', err)
        } finally {
            loading.value = false
        }
    }

    const clearSearch = () => {
        searchResults.value = []
    }

    return {
        searchResults,
        loading,
        error,
        searchCards,
        clearSearch
    }
})