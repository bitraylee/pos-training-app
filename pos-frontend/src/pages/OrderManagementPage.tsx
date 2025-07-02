import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

// Mock data
const mockOrders = [
    {
        id: "ORD001",
        date: "2024-06-01",
        status: "Invoiced",
        customer: "John Doe",
        total: 500,
        products: [
            { name: "Product A", sku: "SKU001", qty: 2, mrp: 100 },
            { name: "Product B", sku: "SKU002", qty: 3, mrp: 100 },
        ],
    },
    {
        id: "ORD002",
        date: "2024-06-02",
        status: "Pending",
        customer: "Jane Smith",
        total: 300,
        products: [
            { name: "Product C", sku: "SKU003", qty: 1, mrp: 300 },
        ],
    },
];

const statusOptions = ["All", "Pending", "Invoiced", "Cancelled"];

const OrderManagementPage = () => {
    const [orders] = useState(mockOrders);
    const [searchId, setSearchId] = useState("");
    const [status, setStatus] = useState("All");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [expanded, setExpanded] = useState<string | null>(null);

    // Filter logic
    const filteredOrders = orders.filter((order) => {
        const matchesId = searchId ? order.id.includes(searchId) : true;
        const matchesStatus = status === "All" ? true : order.status === status;
        const matchesStart = startDate ? order.date >= startDate : true;
        const matchesEnd = endDate ? order.date <= endDate : true;
        return matchesId && matchesStatus && matchesStart && matchesEnd;
    });

    return (
        <div className="min-h-screen flex flex-col items-center bg-white py-10">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Order Manager</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 items-end">
                    <div className="col-span-1">
                        <label className="block text-xs mb-1">Order ID</label>
                        <Input
                            type="text"
                            placeholder="Search Order ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs mb-1">Start Date</label>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs mb-1">End Date</label>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs mb-1">Status</label>
                        <select
                            className="border rounded px-2 py-2 w-full"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.length ? (
                            filteredOrders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <TableRow>
                                        <TableCell>
                                            <button
                                                className="text-blue-600 underline cursor-pointer"
                                                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                                            >
                                                {order.id}
                                            </button>
                                        </TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>{order.customer}</TableCell>
                                        <TableCell>{order.total}</TableCell>
                                        <TableCell>
                                            {order.status === "Invoiced" && (
                                                <Button size="sm" variant="outline">Download Invoice</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    {expanded === order.id && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="bg-gray-50 p-0">
                                                {/* Shared component for product details (can be reused in ProductPage) */}
                                                <div className="p-4">
                                                    <h4 className="font-semibold mb-2">Products</h4>
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Name</TableHead>
                                                                <TableHead>SKU</TableHead>
                                                                <TableHead>Quantity</TableHead>
                                                                <TableHead>MRP</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {order.products.map((prod, idx) => (
                                                                <TableRow key={idx}>
                                                                    <TableCell>{prod.name}</TableCell>
                                                                    <TableCell>{prod.sku}</TableCell>
                                                                    <TableCell>{prod.qty}</TableCell>
                                                                    <TableCell>{prod.mrp}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OrderManagementPage;
