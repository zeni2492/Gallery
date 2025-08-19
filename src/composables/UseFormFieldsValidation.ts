// composables/UseFormFieldsValidation.ts
import { ref, watch, type Ref, computed } from 'vue'

export function useFormValidation(initialValues: Record<string, string>) {
    const touchedFields = ref<Record<string, boolean>>({})
    const errors = ref<Record<string, string>>({})
    const formData: Ref<Record<string, string>> = ref({ ...initialValues })

    const isFormValid = computed(() => {
        return Object.values(formData.value).every(value => value.trim() !== '')
    })

    const setTouched = (fieldName: string) => {
        touchedFields.value[fieldName] = true
    }

    const validateField = (fieldName: string, value: string, errorMessage: string) => {
        errors.value[fieldName] = value.trim() === '' ? errorMessage : ''
    }

    const clearError = (fieldName: string) => {
        if (touchedFields.value[fieldName]) {
            errors.value[fieldName] = ''
        }
    }

    const getFieldClasses = (fieldName: string) => {
        const hasError = touchedFields.value[fieldName] && errors.value[fieldName]
        return [
            'w-full p-2 border rounded-md focus:ring-blue-500 transition-colors duration-200',
            hasError
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500'
        ]
    }

    const createFieldWatcher = (fieldName: string) => {
        watch(() => formData.value[fieldName], () => {
            clearError(fieldName)
        })
    }

    return {
        touchedFields,
        errors,
        formData,
        isFormValid,
        setTouched,
        validateField,
        clearError,
        getFieldClasses,
        createFieldWatcher
    }
}