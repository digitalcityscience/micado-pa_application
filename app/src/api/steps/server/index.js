import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchSteps () {
    return axiosInstance
      .get('/backend/1.0.0/steps?filter[include][0][relation]=translations&filter[include][1][relation]=documents')
      .then(response => response.data)
      .catch(error_handler);
  },
  fetchStepsByProcessId (id) {
   /* const whereClause = {
      idProcess: { eq: id }
    }*/
    return axiosInstance
      .get('/backend/1.0.0/steps?filter[include][0][relation]=translations&filter[include][1][relation]=documents&filter[where][idProcess]=' + id )
      .then(response => response.data)
      .catch(error_handler);
  },

  saveStep (step) {
    console.log(step)
    return axiosInstance
      .post('/backend/1.0.0/steps', step)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveStepTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['id', 'lang', 'step', 'description', 'translationState']));

    // create fake id here
    return axiosInstance
      .post('/backend/1.0.0/steps/' + id + '/step-translations', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },
  updateStepTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['id','translationState']));

    // create fake id here
    return axiosInstance
      .patch('/backend/1.0.0/steps/' + id + '/step-translations', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveStepTranslationProd (id) {
    // create fake id here
    return axiosInstance
      .get('/backend/1.0.0/steps/to-production?id=' + id)
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteStepTranslationProd (id) {
    // create fake id here
    return axiosInstance
      .delete('/backend/1.0.0/steps/' + id + '/step-translation-prods')
      .then(response => response.data)
      .catch(error_handler);
  },
  fetchStepTranslated (id) {

    return axiosInstance
      .get('/backend/1.0.0/steps/' + id + '/step-translations')
      .then(response => response.data)
      .catch(error_handler);
  },
  fetchStepIcons () {
    return axiosInstance
      .get('/backend/1.0.0/mixed-icons')
      .then((response) => response.data)
      .catch(error_handler)
  },
}
