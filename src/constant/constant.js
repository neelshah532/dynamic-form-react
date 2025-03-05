export const INITIAL_BASIC_DETAILS = {
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
  };
  
  export const INITIAL_ADDRESS = {
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
    country: '',
    zipCode: '',
  };
  export const INITIAL_FORM = {
    id: '',
    formName: 'Form 1', 
    basicDetails: { ...INITIAL_BASIC_DETAILS },
    addresses: [{ ...INITIAL_ADDRESS }],
  };
  
  export const Gender_Option = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];