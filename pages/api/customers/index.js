export default async function getAllCustomers(req, res) {
  const customers = await fetch(
    'http://voltcarhire-env.eba-sxer3vyq.eu-west-2.elasticbeanstalk.com/customers/all'
  );

  res.json(customers);
}
