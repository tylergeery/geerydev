import _ from 'lodash'

export default {
    getFromObject(obj) {
        let formData = new FormData()

        _.forOwn(obj, function(value, prop) {
            formData.append(prop, value)
        })

        return formData
    }
}
