const mongoose=require("mongoose")

const courseSchema=new mongoose.Schema({
name:{
    type:String
}
})

const Course=mongoose.models.Course||mongoose.model("Course",courseSchema)

export default Course