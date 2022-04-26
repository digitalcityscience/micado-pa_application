import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchGraphs (id, userLang) {
    return axiosInstance
      .get('/cytoscape?processid=' + id + '&lang=' + userLang)
      .then(response => { return response.data })
      .catch(error_handler)
  },
  saveGraph (data) {
    console.log("client sending data to backend")
    console.log(data)
    return axiosInstance
      .post('/save-process-steps', data)
      .then(response => response.data)
      .catch(error_handler)
  }
}
