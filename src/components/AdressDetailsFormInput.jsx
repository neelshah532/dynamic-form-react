import { Button, Form, Input } from 'antd';
import '../styles/AdressDetailsFormInput.css';
import { MdDelete } from 'react-icons/md';
import { FaPlus  } from 'react-icons/fa6';

const AdressDetailsFormInput = ({ 
  address, 
  formIndex, 
  addressIndex, 
  handleAddressChange, 
  removeAddress, 
  showRemove, 
  addNewAddress 
}) => (
  <div className="address-details-container">
    {addressIndex === 0 && (
      <Button 
        onClick={() => addNewAddress(formIndex)} 
        className="add-address-btn"
      >
        <FaPlus /> Add Address
      </Button>
    )}
    <div className="address-details">
      <div className="address-header">
        <h3>Address {addressIndex + 1}</h3>
        {showRemove && (
          <Button danger onClick={() => removeAddress(formIndex, addressIndex)}>
            <MdDelete /> Remove
          </Button>
        )}
      </div>
      <div className="form-group">
      <Form.Item
        name={['forms', formIndex, 'addresses', addressIndex, 'addressLine1']}
        rules={[{ required: true, message: 'Address Line 1 is required' }]}
      >
        <Input
          placeholder="Address Line 1"
          value={address.addressLine1}
          onChange={(e) => handleAddressChange(formIndex, addressIndex, 'addressLine1', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={['forms', formIndex, 'addresses', addressIndex, 'addressLine2']}
        rules={[{ required: true, message: 'Address Line 2 is required' }]}
      >
        <Input
          placeholder="Address Line 2"
          value={address.addressLine2}
          onChange={(e) => handleAddressChange(formIndex, addressIndex, 'addressLine2', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={['forms', formIndex, 'addresses', addressIndex, 'state']}
        rules={[{ required: true, message: 'State is required' }]}
      >
        <Input
          placeholder="State"
          value={address.state}
          onChange={(e) => handleAddressChange(formIndex, addressIndex, 'state', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={['forms', formIndex, 'addresses', addressIndex, 'city']}
        rules={[{ required: true, message: 'City is required' }]}
      >
        <Input
          placeholder="City"
          value={address.city}
          onChange={(e) => handleAddressChange(formIndex, addressIndex, 'city', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={['forms', formIndex, 'addresses', addressIndex, 'country']}
        rules={[{ required: true, message: 'Country is required' }]}
      >
        <Input
          placeholder="Country"
          value={address.country}
          onChange={(e) => handleAddressChange(formIndex, addressIndex, 'country', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={['forms', formIndex, 'addresses', addressIndex, 'zipCode']}
        rules={[{ min:5, max:6, required: true, message: 'Zip Code is required' }]}
      >
        <Input
        type='number'
          placeholder="Zip Code"
          value={address.zipCode}
          onChange={(e) => handleAddressChange(formIndex, addressIndex, 'zipCode', e.target.value)}
        />
      </Form.Item>
      </div>
    </div>
  </div>
);

export default AdressDetailsFormInput;