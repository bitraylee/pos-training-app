import { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../components/ui/table";
import { Button } from "../components/ui/button";

interface Client {
    id: number;
    client: string;
}

const initialClients: Client[] = [
    { id: 1, client: "client1" },
    { id: 2, client: "client2" },
];

const ClientPage = () => {
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [editId, setEditId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");
    const [adding, setAdding] = useState(false);
    const [addValue, setAddValue] = useState("");

    const handleEdit = (id: number, value: string) => {
        setClients(clients.map((c) => (c.id === id ? { ...c, client: value } : c)));
        setEditId(null);
        setEditValue("");
    };

    const handleAddClient = () => {
        setAdding(true);
        setAddValue("");
    };

    const handleSaveAdd = () => {
        if (addValue.trim()) {
            setClients([
                ...clients,
                { id: clients.length ? clients[clients.length - 1].id + 1 : 1, client: addValue },
            ]);
            setAdding(false);
            setAddValue("");
        }
    };

    const handleCancelAdd = () => {
        setAdding(false);
        setAddValue("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="p-10 max-w-2xl w-full bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Client Master</h2>
                    <Button onClick={handleAddClient} disabled={adding}>
                        Add Client
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="py-4">id</TableHead>
                            <TableHead className="py-4">client</TableHead>
                            <TableHead className="py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.map((c) => (
                            <TableRow key={c.id} className="h-14">
                                <TableCell className="align-middle">{c.id}</TableCell>
                                <TableCell className="align-middle">
                                    {editId === c.id ? (
                                        <input
                                            className="border px-2 py-1 rounded w-full"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => handleEdit(c.id, editValue)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") handleEdit(c.id, editValue);
                                            }}
                                            autoFocus
                                        />
                                    ) : (
                                        <span>{c.client}</span>
                                    )}
                                </TableCell>
                                <TableCell className="align-middle">
                                    {editId === c.id ? null : (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setEditId(c.id);
                                                setEditValue(c.client);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {adding && (
                            <TableRow className="h-14">
                                <TableCell className="align-middle">{clients.length ? clients[clients.length - 1].id + 1 : 1}</TableCell>
                                <TableCell className="align-middle">
                                    <input
                                        className="border px-2 py-1 rounded w-full"
                                        value={addValue}
                                        onChange={(e) => setAddValue(e.target.value)}
                                        onBlur={handleCancelAdd}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleSaveAdd();
                                            if (e.key === "Escape") handleCancelAdd();
                                        }}
                                        autoFocus
                                        placeholder="Enter client name"
                                    />
                                </TableCell>
                                <TableCell className="flex gap-2 align-middle">
                                    <Button size="sm" onClick={handleSaveAdd} disabled={!addValue.trim()}>
                                        Save
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={handleCancelAdd}>
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ClientPage;
