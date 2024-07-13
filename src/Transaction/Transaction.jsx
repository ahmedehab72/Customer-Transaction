import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Transaction = ({ selectedCustomerId }) => {
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const customersResponse = await axios.get('https://ahmedehab72.github.io/host_api/Data.json');
                const transactionsResponse = await axios.get('https://ahmedehab72.github.io/host_api/Data.json');
                setCustomers(customersResponse?.data.customers);
                setTransactions(transactionsResponse?.data.transactions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCustomerId !== '') {
            const customerTransactions = transactions.filter(t => t.customer_id === selectedCustomerId);
            const data = customerTransactions.reduce((acc, transaction) => {
                const date = transaction.date;
                if (!acc[date]) {
                    acc[date] = { date, amount: 0 };
                }
                acc[date].amount += transaction.amount;
                return acc;
            }, {});

            setGraphData(Object.values(data));
        }
    }, [selectedCustomerId, transactions]);

    return (
        <div className="p-6 w-full md:w-[90%] mx-auto">
            <h2 className="text-2xl font-bold my-6 text-center">Transaction Graph</h2>
            {selectedCustomerId && (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default Transaction;
