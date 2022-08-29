import Link from 'next/link';
import Footer from '../../components/Footer';
import styles from '../../styles/Customers.module.css';

const CustomerList = ({ data }) => {
  return (
    <>
      <h2>Customers</h2>
      <Link href={'/customers/add_customer'}>
        <button className={styles.btn}>Add customer</button>
      </Link>
      <ul className={styles.customer_list}>
        {data.map((customer) => (
          <li key={customer.customerId} className={styles.item}>
            <Link href={'/customers/' + customer.customerId}>
              <div>
                <p>id: {customer.customerId}</p>
                <h3>
                  {customer.firstName} {customer.lastName}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CustomerList;

export const getStaticProps = async ({ params }) => {
  const devEndpoint = 'http://localhost:8080/customers/all';
  const prodEndpoint =
    'http://voltcarhire-env.eba-sxer3vyq.eu-west-2.elasticbeanstalk.com/customers/all';
  const res = await fetch(prodEndpoint);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
