import request from '@/utils/request'
export default{
    getCourserSubList(){
        return request({
            url: `/edu/edu-subject`,
            method: 'get'
          })
    },
    saveCourseInfo(courseInfo){
        return request({
            url: `/edu/edu-course/add`,
            method: 'post',
            data:courseInfo
          })
    },
    getCharpter(courseId){
        return request({
            url: `/edu/edu-chapter/${courseId}`,
            method: 'get'
          })
    },
    saveOrUpdateCharpter(charpter){
        return request({
            url: `/edu/edu-chapter/upOrSave`,
            method: 'post',
            data:charpter
          })
    },
}