import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Customers.module.css';

const Customer = ({ customer }) => {
  const handleDelete = async () => {
    const data = {
      customerId: customer.customerId,
    };

    axios
      .delete(
        'http://voltcarhire-env.eba-sxer3vyq.eu-west-2.elasticbeanstalk.com/customers/delete',
        { data }
      )
      .then((response) => {
        if (response.status == 200) {
          Router.push('/customers');
        }
      });
  };

  return (
    <>
      <div className={styles.item}>
        <h2>
          {customer.firstName} {customer.lastName}
        </h2>
        <div className={styles.address}>
          <p>{customer.addressOne}</p>
          <p>{customer.addressTwo}</p>
          <p>{customer.city}</p>
          <p>{customer.postcode}</p>
        </div>
        <p className={styles.drivers_license}>{customer.driversLicense}</p>
        <button onClick={handleDelete} className={styles.btn}>
          Delete
        </button>
      </div>
      <Link href={'/customers'}>
        <h2 className={styles.all_customers}>&larr; All customers</h2>
      </Link>
    </>
  );
};

export default Customer;

export const getStaticPaths = async () => {
  const devEndpoint = 'http://localhost:8080/customers/all';
  const prodEndpoint =
    'http://voltcarhire-env.eba-sxer3vyq.eu-west-2.elasticbeanstalk.com/customers/all';
  const res = await fetch(prodEndpoint);
  const data = await res.json();

  const paths = data.map(({ customerId }) => {
    return {
      params: { customerId: customerId.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const customerId = context.params.customerId;
  const res = await fetch(
    'http://voltcarhire-env.eba-sxer3vyq.eu-west-2.elasticbeanstalk.com/customers/' +
      customerId
  );
  const data = await res.json();

  return {
    props: { customer: data },
  };
};
