import request from '@/utils/request'
export default{
    getTeacherList(limit,size,teacher){
        return request({
            url: `/edu-teacher/findAllByPage/${limit}/${size}`,
            method: 'post',
            //这里是因为后端放在requestBody中
            data: teacher
          })
    },
    addTeacher(){

    }
}