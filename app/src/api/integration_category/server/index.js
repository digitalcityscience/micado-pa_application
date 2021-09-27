import { axiosInstance }  from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchIntegrationCategory () {
    return axiosInstance
      .get('/backend/1.0.0/intervention-categories?filter[include][0][relation]=translations&filter[include][1][relation]=linkedInterventionType')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  

    updateIntegrationCategory (integration_category) {
      const whereClause = {
        id: { eq: integration_category.id }
      },
        updatingCategory =  JSON.parse(JSON.stringify(integration_category, ['id', 'published']))
  
      return axiosInstance
        .patch('/backend/1.0.0/intervention-categories?where=' + JSON.stringify(whereClause), updatingCategory)
        .then(response => response.data)
        .catch(error_handler);
    },
  
    updateIntegrationCategoryTranslation (translation) {
      const whereClause = {
        id: { eq: translation.id }, lang: { eq: translation.lang }, translated: {eq: translation.translated}
      },
        updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['id', 'lang', 'title', 'translationState', 'translationDate', 'translated'])) : translation
  
      return axiosInstance
        .patch('/backend/1.0.0/intervention-categories/' + translation.id + '/intervention-category-translations?where=' + JSON.stringify(whereClause), updatingTranslation)
        .then(response => response.data)
        .catch(error_handler);
    },
    
    saveIntegrationCategory (integration_category) {
      // create fake id here
      return axiosInstance
      .post('/backend/1.0.0/intervention-categories', integration_category)
      .then(response => response.data)
      .catch(error_handler);
    },
    saveIntegrationCategoryTranslation (translation, id) {
      translation.id = id
      const savingTranslation = JSON.parse(JSON.stringify(translation));
  
      // create fake id here
      return axiosInstance
        .post('/backend/1.0.0/intervention-categories/' + id + '/intervention-category-translations', savingTranslation)
        .then(response => response.data)
        .catch(error_handler);
    },
    deleteIntegrationCategoryTranslations (id) {
      return axiosInstance
        .delete('/backend/1.0.0/intervention-categories/' + id + '/intervention-category-translations')
        .then(response => response.data)
        .catch(error_handler);
    },
  
    deleteIntegrationCategory (id) {
      return axiosInstance
        .delete('/backend/1.0.0/intervention-categories/' + id)
        .then(response => response.data)
        .catch(error_handler);
    },
    updatePublished(id, is_published){
      return axiosInstance
      .patch('/backend/1.0.0/intervention-categories?[where][id]='+ id, {published: is_published})
      .then(response => response.data)
      .catch(error_handler);
  
    }, 
    saveCategoryTranslationProd (id) {
  
      // create fake id here
      return axiosInstance
        .get('/backend/1.0.0/intervention-categories/to-production?id=' + id)
        .then(response => response.data)
        .catch(error_handler);
    },
    deleteCategoryTranslationProd (id) {
      // create fake id here
      return axiosInstance
        .delete('/backend/1.0.0/intervention-categories/' + id + '/intervention-category-translation-prods')
        .then(response => response.data)
        .catch(error_handler);
    },
    fetchCategoryTranslated (id) {
  
      return axiosInstance
        .get('/backend/1.0.0/intervention-categories/' + id + '/intervention-category-translations')
        .then(response => response.data)
        .catch(error_handler);
    },

    deleteIntegrationTypeTranslations (id) {
      return axiosInstance
        .delete(`/backend/1.0.0/intervention-types/${id}/intervention-types-translations`)
        .then((response) => response.data)
        .catch(error_handler)
    },
    deleteInterventionByType(id){
      return axiosInstance
      .delete('/backend/1.0.0/intervention-types/' + id + '/individual-intervention-plan-interventions')
      .then(response => response.data)
      .catch(error_handler);
    },
    deleteInterventionTypeValidators(id){
      return axiosInstance
      .delete('/backend/1.0.0/intervention-types/' + id + '/intervention-type-validators?[where][interventionTypeId]='+ id)
      .then(response => response.data)
      .catch(error_handler);
    },
    deleteIntegrationType (id) {
      return axiosInstance
        .delete(`/backend/1.0.0/intervention-types/${id}`)
        .then((response) => response.data)
        .catch(error_handler)
    },
  }
