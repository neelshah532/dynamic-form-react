import { Form, Input, Select } from 'antd'
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
    <h2>Personal Details</h2>
    <div className="form-group">
    <Form.Item
        name={['forms', formIndex, 'username']}
        rules={[
          { required: true, message: 'Name is required' },
        ]}
      >
        <Input
          placeholder="Enter Your Name"
          value={basicDetails?.name}
          onChange={(e) => handleBasicChange(formIndex, 'username', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={['forms', formIndex, 'email']}
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Invalid email format' },
        ]}
      >
        <Input
          placeholder="Enter Your Email"
          value={basicDetails?.email}
          onChange={(e) => handleBasicChange(formIndex, 'email', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={['forms', formIndex, 'phone']}
        rules={[
          { min: 10, max:10 ,required: true, message: 'Phone number is required' },
        ]}
      >
        <Input
        type='number'
          placeholder="Enter Your Phone Number"
          value={basicDetails?.phone}
          onChange={(e) => handleBasicChange(formIndex, 'phone', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={['forms', formIndex, 'age']}
        rules={[
          { required: true, message: 'Age is required' },
        ]}
      >
        <Input
          type="number"
          placeholder="Enter Your Age"
          value={basicDetails?.age}
          onChange={(e) => handleBasicChange(formIndex, 'age', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={['forms', formIndex, 'gender']}
        rules={[
          { required: true, message: 'Gender is required' },
        ]}
      >
        <Select
          value={basicDetails?.gender}
          onChange={(value) => handleBasicChange(formIndex, 'gender', value)}
          placeholder="Select Gender"
        >
          {Gender_Option.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  </div>
   </>
  )
}

export default BasicDetailsFormInput