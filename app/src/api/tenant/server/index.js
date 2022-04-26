import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchTenants () {
    return axiosInstance
      .get('/tenants')
      .then((response) => { return response.data })
      .catch(error_handler)
  },
  saveTenant (tenant) {
    // create fake id here
    return axiosInstance
      .post('/tenants', tenant)
      .then(response => response.data)
      .catch(error_handler)
  }
  /* ,
  saveComment (comment) {
    // create fake id here
    return axiosInstance
      .post('/comments', comment)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveCommentTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['id', 'lang', 'comment']));

    // create fake id here
    return axiosInstance
      .post('/comments/' + id + '/comments-translations', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveProcessComment (comment_id, id) {
    const savingTranslation = { idprocess: id, idcomment: comment_id }

    // create fake id here
    return axiosInstance
      .post('/processes/' + id + '/process-comments', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },

  deleteCommentTranslations (id) {
    return axiosInstance
      .delete('/comments/' + id + '/comments-translations')
      .then(response => response.data)
      .catch(error_handler);
  },

  deleteComment (id) {
    return axiosInstance
      .delete('/comments/' + id)
      .then(response => response.data)
      .catch(error_handler);
  },

  updateComment (comment) {
    const whereClause = {
      id: { eq: comment.id }
    },
      updatingTopic =  JSON.parse(JSON.stringify(comment, ['id']))

    return axiosInstance
      .patch('/comments?where=' + JSON.stringify(whereClause), updatingTopic)
      .then(response => response.data)
      .catch(error_handler);
  },

  updateCommentTranslation (translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }
    },
      updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['id', 'lang', 'comment'])) : translation

    return axiosInstance
      .patch('/comments/' + translation.id + '/comments-translations?where=' + JSON.stringify(whereClause), updatingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  }
  */
}
