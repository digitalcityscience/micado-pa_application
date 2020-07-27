import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'
export default {
  fetchInterventionPlan (id) {
    console.log(id)
    console.log("CALLING API!!!!")
    const whereClause = {
      userId: { eq: id }
    }
    return axiosInstance
      .get('/backend/1.0.0/individual-intervention-plans?filter[include][0][relation]=interventions&where=' + JSON.stringify(whereClause))
      .then(response => response.data)
      .catch(error_handler);
    },
    saveIntervention (id, intervention) {
      console.log(id)
      console.log("CALLING API!!!!")
      
      const savingIntervention = JSON.parse(JSON.stringify(intervention, [ 'listId','interventionType','validationDate', 'completed','validatingUserId','validatingUserTenant','assignmentDate', 'validationRequestDate']));
     
      return axiosInstance
        .post('/backend/1.0.0/individual-intervention-plans/' + id + '/individual-intervention-plan-interventions', savingIntervention)
        .then(response => response.data)
        .catch(error_handler);
      },
      editIntervention (id_plan, intervention) {
        console.log(id_plan)
        const whereClause = {
          id: { eq: intervention.id }
        },
        
         editingIntervention = JSON.parse(JSON.stringify(intervention, [ 'id','listId','interventionType', 'completed']));
       
        return axiosInstance
          .patch('/backend/1.0.0/individual-intervention-plans/' + id_plan + '/individual-intervention-plan-interventions?where=' + JSON.stringify(whereClause), editingIntervention)
          .then(response => response.data)
          .catch(error_handler);
        },
    saveIntegrationCategory(integration_category) {
      console.log("fake call to save to DB")
      console.log(integration_category)
      // create fake id here
      integration_category.id = 999
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(integration_category)
        }, 0)
      })
    },
    deleteIntegrationCategory(integration_category) {
      console.log("fake call to save to DB")
      console.log(integration_category)
      // create fake id here
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(integration_category)
        }, 0)
      })
    }
  }
