import mongoose from 'mongoose';

class AddressModel {
  country: string;

  state: string;

  city: string;

  zipCode: number;

  street: string;
}

export interface UserInterface {
  name: string;

  email: string;

  phoneNumber: string;

  password: string;

  empCode: string;

  deaprtment: mongoose.Schema.Types.ObjectId[];

  designation: mongoose.Schema.Types.ObjectId[];

  role: mongoose.Schema.Types.ObjectId[];

  gender: string;

  dob: Date;

  joiningDate: Date;

  hiringDate: Date;

  isActive: boolean;

  profilePictue: string;

  address: AddressModel;
}
