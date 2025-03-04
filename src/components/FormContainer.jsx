import React from 'react'
import BasicDetailsFormInput from './BasicDetailsFormInput'
import AdressDetailsFormInput from './AdressDetailsFormInput'

const FormContainer = () => {
  return (
    <>
    <div>
        <BasicDetailsFormInput/>
    </div>
    <div>
        <AdressDetailsFormInput/>
    </div>
    </>
  )
}

export default FormContainer