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
    getAllTeacher(){
        return request({
            url: `/edu-teacher/findAll`,
            method: 'get'
          })
    },
    addOrUpdateTeacher(ruleForm){
        return request({
            url: `/edu-teacher/addTeacher`,
            method: 'post',
            //这里是因为后端放在requestBody中
            data: ruleForm
          })
    },
    deleteTeacher(id){
        return request({
            url: `/edu-teacher/${id}`,
            method: 'delete'
          })
    }
}