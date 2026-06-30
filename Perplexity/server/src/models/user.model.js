import mongoose from  "mongoose"
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
username :{type:String, required :true , trim:true, unique:true},
email:{type:String , required :true, unique:true, lowercase:true, trim:true},
password:{ type:String , required:true, minlength:6},
verified:{type:Boolean , default:false}
}, { timestamps:true })


userSchema.pre('save' , async function() {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)    
})


userSchema.methods.comparePassword = function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}
const UserModel = mongoose.model('Users' , userSchema);
export default UserModel