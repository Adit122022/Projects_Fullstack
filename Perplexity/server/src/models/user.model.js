import mongoose from  "mongoose"
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
username :{type:String, required :true , trim:true, unique:true},
email:{type:String , required :true, unique:true, lowercase:true, trim:true},
password:{ type:String , required:true, minlength:6},
verified:{type:Boolean , default:False}
}, { timestamps:true })


userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next();
    
})


userSchema.methods.comparePassword = function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}
const UserModel = mongoose.model('Users' , userSchema);
export default UserModel