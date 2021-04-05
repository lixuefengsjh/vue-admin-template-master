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
}