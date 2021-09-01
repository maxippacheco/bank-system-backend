const { Schema, model } = require("mongoose");


const UserSchema = new Schema({
	status:{
		type: Boolean,
		default: true
	},
	firstname: {
		type: String,
		required: [true, 'The name is required'],
	},
	lastname: {
		type: String,
		required: [true, 'The lastname is required']
	},
	email:{
		type: String,
		required: [true, 'The email is required'],
		unique: true
	},
	password:{
		type: String,
		required: [true, 'The password is required']
	},
	birthday:{
		type: Date,
		required:[true, 'Your birthday is required'],
		trim: true
	},
	nationality:{
		type: String,
		required: [true, 'The nacionality is required']
	},
	role:{
    type: String,
		required: true,
		default: 'USER_ROLE'
	},
	phone:{
		type: Number,
		required: [true, 'The mobile phone is required'],
		unique: true
	},
	amount:{
		type: Number,
		required: [true, 'You have to put some money on your account to open it'],
		unique: true
	}
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, password, ...user  } = this.toObject();
    user.id = _id;
    return user;
}



module.exports = model('User', UserSchema);

//TODO: ADDRESS SCHEMA

/*


const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  cityDistrictTown: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    required: true,
  },
  landmark: {
    type: String,
    min: 10,
    max: 100,
  },
  alternatePhone: {
    type: String,
  },
  addressType: {
    type: String,
    required: true,
    enum: ["home", "work"],
    required: true,
  },
});

// B
const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

mongoose.model("Address", addressSchema);
module.exports = mongoose.model("UserAddress", userAddressSchema);


*/