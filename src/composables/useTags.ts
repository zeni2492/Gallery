import { ref } from 'vue';

export function useTags(initialTags: string[] = []) {
    const tags = ref<string[]>(initialTags);
    const newTag = ref('');

    const addTag = () => {
        if (newTag.value.trim() && !tags.value.includes(newTag.value.trim())) {
            tags.value.push(newTag.value.trim()[0].toUpperCase() + newTag.value.trim().slice(1));
            newTag.value = '';
        }
    };

    const removeTag = (index: number) => {
        tags.value.splice(index, 1);
    };

    return {
        tags,
        newTag,
        addTag,
        removeTag
    };
}