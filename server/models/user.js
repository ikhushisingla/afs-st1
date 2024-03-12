const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,

        },
        password:{
            type:String,
            required:true,
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
    },
    {timestamps:true}
)

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  userSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
  };
  
module.exports=mongoose.model("User",userSchema);