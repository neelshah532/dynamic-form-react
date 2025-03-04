import { Input, Select } from 'antd'
import React from 'react'
import { Gender_Option } from '../constant/constant'
import "../styles/BasicDetailsFormInput.css"

const { Option } = Select;

const BasicDetailsFormInput = ({ basicDetails, formIndex, handleBasicChange }) => {

    //basicDetails is the object that contains the value by passing the props from the parent component( form container)
    //formIndex is the index of the form that is passed from the parent component 
    //handleBasicChange is the function that is managed the changes of index, value , name of the input field

  return (
   <>
   <div className="basic-details">
    <h2>Basic Details</h2>
    <div className="form-group">
      <Input
        placeholder="Name"
        value={basicDetails.name}
        onChange={(e) => handleBasicChange(formIndex, 'name', e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={basicDetails.email}
        onChange={(e) => handleBasicChange(formIndex, 'email', e.target.value)}
      />
      <Input
        type="tel"
        placeholder="Phone Number"
        value={basicDetails.phone}
        onChange={(e) => handleBasicChange(formIndex, 'phone', e.target.value)}
      />
      <Input
        type="number"
        placeholder="Age"
        value={basicDetails.age}
        onChange={(e) => handleBasicChange(formIndex, 'age', e.target.value)}
      />
      <Select
        value={basicDetails.gender}
        onChange={(value) => handleBasicChange(formIndex, 'gender', value)}
      >
        {Gender_Option .map(option => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  </div>
   </>
  )
}

export default BasicDetailsFormInput