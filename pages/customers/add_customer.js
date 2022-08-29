import { useState } from 'react';
import Router from 'next/router';
import styles from '../../styles/Form.module.css';

const initialValues = {
  firstName: '',
  lastName: '',
  addressOne: '',
  addressTwo: '',
  city: '',
  postcode: '',
  driversLicense: '',
};

const AddCustomer = () => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      'http://voltcarhire-env.eba-sxer3vyq.eu-west-2.elasticbeanstalk.com/customers/add',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    );

    if (res.status == 200) {
      const jsonResponse = await res.json();
      Router.push('/customers');
    } else {
      console.error(res.status, res.statusText);
    }
  };

  return (
    <form className={styles.form}>
      <input
        placeholder="first name"
        value={values.firstName}
        onChange={handleInputChange}
        name="firstName"
      />
      <input
        placeholder="last name"
        value={values.lastName}
        onChange={handleInputChange}
        name="lastName"
      />
      <input
        placeholder="address one"
        value={values.addressOne}
        onChange={handleInputChange}
        name="addressOne"
      />
      <input
        placeholder="address two"
        value={values.addressTwo}
        onChange={handleInputChange}
        name="addressTwo"
      />
      <input
        placeholder="city"
        value={values.city}
        onChange={handleInputChange}
        name="city"
      />
      <input
        placeholder="postcode"
        value={values.postcode}
        onChange={handleInputChange}
        name="postcode"
      />
      <input
        placeholder="drivers license"
        value={values.driversLicense}
        onChange={handleInputChange}
        name="driversLicense"
      />
      <button type="submit" onClick={handleSubmit} className={styles.btn}>
        Add
      </button>
    </form>
  );
};

export default AddCustomer;
