import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { v4 as generateUniqueId } from 'uuid';
import "../styles/FormContainer.css"
import { INITIAL_ADDRESS, INITIAL_BASIC_DETAILS } from '../constant/constant';
import BasicDetailsFormInput from './BasicDetailsFormInput';
import AdressDetailsFormInput from './AdressDetailsFormInput';
import { MdDelete } from 'react-icons/md';
import { FaPlus  } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid'; 

const FormContainer = () => {
  const [formCollections, setFormCollections] = useState([createNewFormTemplate()]);
  const [activeNameEditIndex, setActiveNameEditIndex] = useState(null);
  const form = Form.useForm()[0];

  function  createNewFormTemplate() {
    return {
      id:  uuidv4(),
      name: generateFormName(),
      basicDetails: { ...INITIAL_BASIC_DETAILS },
      addresses: [{ ...INITIAL_ADDRESS }],
    };
  }

  function generateFormName() {
    return `Form-${generateUniqueId().slice(0, 8)}`;
  }

  //this is for add new form
  const addNewForm = () => {
    setFormCollections(previousForms => [
      ...previousForms, 
      createNewFormTemplate()
    ]);
  };

  // Remove a form from the from form array
  const removeForm = (formIndex) => {
    // Prevent to remove the first index form
    if (formIndex === 0) return;
    
    setFormCollections(previousForms => 
      previousForms.filter((_, index) => index !== formIndex)
    );
  };

  // Update basic details a particular speciifiic form
  const updateBasicDetails = (formIndex, field, value) => {
    setFormCollections(previousForms => {
      const updatedForms = [...previousForms];
      updatedForms[formIndex].basicDetails[field] = value;
      return updatedForms;
    });
  };

  // Update address details for a specifically  form and addrtess
  const updateAddressDetails = (formIndex, addressIndex, field, value) => {
    setFormCollections(previousForms => {
      const updatedForms = [...previousForms];
      updatedForms[formIndex].addresses[addressIndex][field] = value;
      return updatedForms;
    });
  };

  const addNewAddress = (formIndex) => {
    setFormCollections(previousForms => {
      const updatedForms = [...previousForms];
      if (updatedForms[formIndex]) {
        updatedForms[formIndex] = {
          ...updatedForms[formIndex],
          addresses: [...updatedForms[formIndex].addresses, { ...INITIAL_ADDRESS }]
        };
      }
      return updatedForms;
    });
  };

  const removeAddress = (formIndex, addressIndex) => {
    setFormCollections(previousForms => {
      const updatedForms = [...previousForms];
      if (updatedForms[formIndex] && updatedForms[formIndex].addresses.length > 1) {
        updatedForms[formIndex] = {
          ...updatedForms[formIndex],
          addresses: updatedForms[formIndex].addresses.filter((_, index) => index !== addressIndex)
        };
      }
      return updatedForms;
    });
  };

  // this function is for handle the form name edit
  const handleFormNameEdit = (formIndex, event) => {
    const newName = event.target.textContent.trim() || generateFormName();
    
    setFormCollections(previousForms => {
      const updatedForms = [...previousForms];
      updatedForms[formIndex].name = newName;
      return updatedForms;
    });
  };

  // button for trigger the editable text event
  const toggleNameEditing = (formIndex) => {
    setActiveNameEditIndex(
      activeNameEditIndex === formIndex ? null : formIndex
    );
  };

  // Submit data
  const submitFormData = () => {
    const formattedSubmissionData = formCollections.map(form => ({
      [form.name]: {
        basicDetails: form.basicDetails,
        addresses: form.addresses,
      },
    }));
    
    console.log("Form Data:", formattedSubmissionData);
  };

  return (
    <Form form={form} layout="vertical" className="form-container">
      {formCollections.map((form, formIndex) => (
        <div key={form.id} className="main-form-section">
          {/* Editable  header name*/}
          <div className="form-header">
            <h2
              contentEditable={activeNameEditIndex === formIndex}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleFormNameEdit(formIndex, e)}
              className={activeNameEditIndex === formIndex ? 'name-editing-mode' : ''}
            >
              {form.name}
            </h2>
            
            <div className="header-actions">
              <Button onClick={() => toggleNameEditing(formIndex)}>
                {activeNameEditIndex === formIndex ? 'Save Name' : 'Edit Name'}
              </Button>
              
              {formIndex > 0 && (
                <Button danger onClick={() => removeForm(formIndex)}>
                   <MdDelete /> Remove Form
                </Button>
              )}
            </div>
          </div>
          <BasicDetailsFormInput
            basicDetails={form.basicDetails}
            formIndex={formIndex}
            handleBasicChange={updateBasicDetails}
          />

          <div className="address-section">
            {form.addresses.map((address, addressIndex) => (
              <AdressDetailsFormInput
                key={addressIndex}
                address={address}
                formIndex={formIndex}
                addressIndex={addressIndex}
                handleAddressChange={updateAddressDetails}
                removeAddress={removeAddress}
                showRemove={form.addresses.length > 1 && addressIndex > 0}
                addNewAddress={addNewAddress}
              />
            ))}
          </div>
        </div>
      ))}
      
      <div className="form-actions">
        <Button type="primary" onClick={addNewForm}>
        <FaPlus  />  Add New Form
        </Button>
        <Button type="primary" onClick={submitFormData}>
          Submit All Forms
        </Button>
      </div>
    </Form>
  );
};

export default FormContainer;