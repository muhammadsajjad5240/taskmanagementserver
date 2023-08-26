import mongoose from 'mongoose';

export type userQueryOptions = {
  name: string;
  email: string;
  phoneNumber: string;
  empCode: string;
  deaprtment: mongoose.Types.ObjectId;
  designation: mongoose.Types.ObjectId;
  role: mongoose.Types.ObjectId;
  gender: string;
  dob: string;
  joiningDate: string;
  hiringDate: string;
  isActive: boolean;
  country: string;
  city: string;
  zipCode: string;
};
