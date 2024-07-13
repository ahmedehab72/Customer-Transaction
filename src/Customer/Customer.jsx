import  { useEffect, useState } from "react";
import axios from "axios";

const Customer = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({ name: "", amount: "" });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://ahmedehab72.github.io/host_api/Data.json");
        setCustomers(response?.data.customers);
        setTransactions(response?.data.transactions);
        setFilteredData(response?.data.transactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });

    const filtered = transactions.filter((transaction) => {
      const customer = customers.find((c) => c.id === transaction.customer_id);
      return (
        (!filter.name ||
          (customer &&
            customer.name.toLowerCase().includes(filter.name.toLowerCase()))) &&
        (!filter.amount || transaction.amount >= parseFloat(filter.amount))
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="w-[90%] mx-auto mt-8">
      <h2 className="my-4 text-center text-4xl font-bold">Customer Service</h2>
      <input
        name="name"
        value={filter.name}
        onChange={handleFilterChange}
        type="text"
        className="w-full rounded-xl border-gray-900 border py-2 px-4"
        placeholder="Search By Name"
      />
      <table className="w-full text-center my-5">
        <thead className="border">
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Transaction Date</th>
            <th>Transaction Amount</th>
          </tr>
        </thead>
        <tbody className="mt-5">
          {filteredData.map((transaction) => {
            const customer = customers.find((c) => c.id === transaction.customer_id);
            return (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border-b text-center">
                  <input
                    type="radio"
                    name="selectedCustomer"
                    value={transaction.customer_id}
                    onChange={() => onSelectCustomer(transaction.customer_id)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">{transaction.id}</td>
                <td className="py-2 px-4 border-b text-center">
                  {customer ? customer.name : "Unknown"}
                </td>
                <td className="py-2 px-4 border-b text-center">{transaction.date}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
