import client from 'api-images-client'

export default {
    data () {
        return {
            cancelToken: null
        }
    },
    methods: {
        async uploadImage (file, onUploadProgressFn = null) {
            // Returns url of the new uploaded image
            let array = client.uploadImage(file, onUploadProgressFn)
            this.cancelToken = array[1]
            let result = await array[0]
            let hostname = window.location.hostname
            if (hostname === "localhost") {
                hostname = this.$envconfig.paUrl
            }
            return window.location.protocol + "//" + hostname + "/micado_img/" + result.files[0].new_filename
        },
        cancel () {
            if (this.cancelToken !== null) {
                this.cancelToken.cancel()
            }
        },
        isCancel (error) {
            return client.isRequestCancel(error)
        }
    }
}