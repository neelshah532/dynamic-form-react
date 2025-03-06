import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { v4 as generateUniqueId } from 'uuid';
import "../styles/FormContainer.css";
import { INITIAL_ADDRESS, INITIAL_BASIC_DETAILS } from '../constant/constant';
import BasicDetailsFormInput from './BasicDetailsFormInput';
import AdressDetailsFormInput from './AdressDetailsFormInput';
import { MdDelete } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';

const FormContainer = () => {
  const [formCollections, setFormCollections] = useState([
    createNewFormTemplate(),
  ]);
  const [activeNameEditIndex, setActiveNameEditIndex] = useState(null);
  const [form] = Form.useForm();

  function createNewFormTemplate() {
    return {
      id: generateUniqueId(),
      name: generateFormName(),
      basicDetails: { ...INITIAL_BASIC_DETAILS },
      addresses: [{ ...INITIAL_ADDRESS }],
    };
  }

  function generateFormName() {
    return `Form-${generateUniqueId().slice(0, 8)}`;
  }

  const addNewForm = () => {
    setFormCollections((previousForms) => {
      const newForm = createNewFormTemplate();
      const newForms = [...previousForms, newForm];
      
      const currentValues = form.getFieldsValue();
 
      form.setFieldsValue({
        forms: [
          ...(currentValues.forms || previousForms),
          {
            ...newForm,
            basicDetails: { ...newForm.basicDetails },
            addresses: [...newForm.addresses],
          }
        ]
      });
      
      return newForms;
    });
  };
  // const removeForm = (formIndex) => {
  //   if (formIndex === 0) return;
    
  //   setFormCollections((previousForms) => {
  //     const newForms = previousForms.filter((_, index) => index !== formIndex);
  //     const currentValues = form.getFieldsValue();
  //     console.log('currentValues', currentValues);
  //     console.log('newForms', newForms);
  //     console.log('formIndex', formIndex);
  //     if (currentValues.forms) {
  //       const updatedForms = currentValues.forms.filter((_, index) => index !== formIndex);
  //       form.setFieldsValue({
  //         forms: updatedForms
  //       });
  //     }
      
  //     return newForms;
  //   });
  // };
  const removeForm = (formIndex) => {
    if (formIndex === 0) return;
  
    setFormCollections((previousForms) => {
      const newForms = previousForms.filter((_, index) => index !== formIndex);
  
      const currentValues = form.getFieldsValue();
      
      // Filter out the removed form in form field values
      const updatedForms = currentValues.forms
        ? currentValues.forms.filter((_, index) => index !== formIndex)
        : [];
  
      form.setFieldsValue({
        forms: updatedForms,
      });
  
      return newForms;
    });
  };
  

  const updateBasicDetails = (formIndex, field, value) => {
    setFormCollections((previousForms) => {
      const updatedForms = [...previousForms];
      updatedForms[formIndex].basicDetails[field] = value;
      return updatedForms;
    });
  };

  const updateAddressDetails = (formIndex, addressIndex, field, value) => {
    setFormCollections((previousForms) => {
      const updatedForms = [...previousForms];
      updatedForms[formIndex].addresses[addressIndex][field] = value;
      return updatedForms;
    });
  };

  const addNewAddress = (formIndex) => {
    setFormCollections((previousForms) => {
      const updatedForms = [...previousForms];
      if (updatedForms[formIndex]) {
        updatedForms[formIndex] = {
          ...updatedForms[formIndex],
          addresses: [
            ...updatedForms[formIndex].addresses,
            { ...INITIAL_ADDRESS }, 
          ],
        };
      }
      return updatedForms;
    });
  };

  const removeAddress = (formIndex, addressIndex) => {
    setFormCollections((previousForms) => {
      const updatedForms = [...previousForms];
      if (updatedForms[formIndex] && updatedForms[formIndex].addresses.length > 1) {
        const newAddresses = updatedForms[formIndex].addresses.filter(
          (_, index) => index !== addressIndex
        );
        updatedForms[formIndex] = {
          ...updatedForms[formIndex],
          addresses: newAddresses,
        };       
        form.setFieldsValue({
          forms: updatedForms.map((f, idx) =>
            idx === formIndex ? { ...f, addresses: newAddresses } : f
          ),
        });
      }
      return updatedForms;
    });
  };

  const handleFormNameEdit = (formIndex, event) => {
    const newName = event.target.textContent.trim() || generateFormName();
    setFormCollections((previousForms) => {
      const updatedForms = [...previousForms];
      updatedForms[formIndex].name = newName;
      return updatedForms;
    });
  };

  const toggleNameEditing = (formIndex) => {
    setActiveNameEditIndex(
      activeNameEditIndex === formIndex ? null : formIndex
    );
  };

  const submitFormData = () => {
    form
      .validateFields()
      .then(() => {
        const formattedSubmissionData = formCollections.map((form) => ({
          [form.name]: {
            basicDetails: form.basicDetails,
            addresses: form.addresses,
          },
        }));
        console.log("Form Data:", formattedSubmissionData);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };
  return (
    <Form form={form} layout="vertical" className="form-container">
      {formCollections.map((form, formIndex) => (
        <div key={form.id} className="main-form-section">
          <div className="form-header">
            <h2
              contentEditable={activeNameEditIndex === formIndex}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleFormNameEdit(formIndex, e)}
              style={{
                padding: '4px 8px',
                border: activeNameEditIndex === formIndex ? '2px solid #1890ff' : '1px solid transparent',
                backgroundColor: activeNameEditIndex === formIndex ? '#e6f7ff' : 'transparent',
                borderRadius: '4px',
                display: 'inline-block',
                outline: 'none',
              }}
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
          <FaPlus /> Add New Form
        </Button>
        <Button type="primary" onClick={submitFormData}>
          Submit All Forms
        </Button>
      </div>
    </Form>
  );
};

export default FormContainer;