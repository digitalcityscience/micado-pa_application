import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchInformationCategory() {
    return axiosInstance
      .get('/backend/1.0.0/information-categories?filter[include][0][relation]=translations')
      .then((response) => response.data)
      .catch(error_handler)
  },
  updateInformationCategory(information_category) {
    return axiosInstance
      .patch(`/backend/1.0.0/information-categories/${information_category.id}`, information_category)
      .then((response) => response.data)
      .catch(error_handler)
  },

  updateInformationCategoryTranslation(translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }
    }
    translation.translationDate =  new Date().toISOString()
    return axiosInstance
      .patch(`/backend/1.0.0/information-categories/${translation.id}/information-category-translations?where=${JSON.stringify(whereClause)}`, translation)
      .then((response) => response.data)
      .catch(error_handler)
  },

  saveInformationCategory(information_category) {
    return axiosInstance
      .post('/backend/1.0.0/information-categories', information_category)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveInformationCategoryTranslation(translation, id) {
    translation.id = id
    translation.translationDate = new Date().toISOString()
    return axiosInstance
      .post(`/backend/1.0.0/information-categories/${id}/information-category-translations`, translation)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveInformationCategoryTranslationProd(translation, id) {
    translation.id = id
    translation.translationDate = new Date().toISOString()
    return axiosInstance
      .post(`/backend/1.0.0/information-categories/${id}/information-category-translation-prods`, translation)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteInformationCategoryTranslations(id) {
    return axiosInstance
      .delete(`/backend/1.0.0/information-categories/${id}/information-category-translations`)
      .then((response) => response.data)
      .catch(error_handler)
  },

  deleteInformationCategory(id) {
    return axiosInstance
      .delete(`/backend/1.0.0/information-categories/${id}`)
      .then((response) => response.data)
      .catch(error_handler)
  },

  updatePublished(id, is_published){
    return axiosInstance
    .patch('/backend/1.0.0/information-categories?[where][id]='+ id, {published: is_published})
    .then(response => response.data)
    .catch(error_handler)
  },

  deleteProdTranslations(id) {
    return axiosInstance
        .delete(`/backend/1.0.0/information-categories/${id}/information-category-translation-prods`)
        .then((response) => response.data)
        .catch(error_handler)
  }
}