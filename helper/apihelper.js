import axios from "axios";

export const addCourse = (name) => {
  return axios.post('/api/course',JSON.stringify({name:name}))
  };

  export const getCourse = () => {
    return axios.get('/api/course')
};

export const deleteCourse = (formData) => {
  return axios.delete(`/api/course?id=${formData}`)
};
export const updateCourse = (formData) => {
  console.log(formData)
  const name=formData.updatedCourse
  return axios.put(`/api/course/${formData.updateId}`,JSON.stringify({name:name}))
};

