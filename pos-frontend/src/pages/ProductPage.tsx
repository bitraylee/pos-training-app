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
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "../components/ui/card";

// Mock product data
const initialProducts = [
    {
        id: 1,
        client: "client1",
        name: "Product A",
        sku: "SKU001",
        inventory: 100,
        image: "https://via.placeholder.com/40",
    },
    {
        id: 2,
        client: "client2",
        name: "Product B",
        sku: "SKU002",
        inventory: 50,
        image: "https://via.placeholder.com/40",
    },
];

type Product = typeof initialProducts[number];

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [search, setSearch] = useState("");
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Filter products by client, name, or sku
    const filteredProducts = products.filter(
        (p) =>
            p.client.toLowerCase().includes(search.toLowerCase()) ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.sku.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (product: Product) => {
        setEditProduct(product);
        setShowEditModal(true);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white py-10">
            <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div className="flex gap-2">
                        <Button onClick={() => {/* redirect to add product page */ }}>Add Product</Button>
                        <Button variant="outline" onClick={() => {/* handle product master upload */ }}>
                            Upload Product Master (TSV)
                        </Button>
                        <Button variant="outline" onClick={() => {/* handle inventory upload */ }}>
                            Upload Inventory (TSV)
                        </Button>
                    </div>
                    <Input
                        className="max-w-xs"
                        placeholder="Search by client, name, or SKU..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Inventory</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length ? (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.client}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>{product.inventory}</TableCell>
                                    <TableCell>
                                        <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                                    </TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <Card className="w-96 p-0">
                        <CardHeader>
                            <CardTitle>Edit Product</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Form fields for editing product and inventory would go here */}
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowEditModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setShowEditModal(false)}>Save</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
