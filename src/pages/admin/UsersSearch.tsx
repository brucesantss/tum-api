import { NavBar } from "../NavBar"

import axios from "axios";
import { useState } from "react";
import { Button } from "../../components/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/components/ui/table";
import { Loader } from "lucide-react";
import { Input } from "../../components/components/ui/input";

export const UserSearch = () => {

    const [inputSearch, setinputSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!inputSearch.trim()) return; // Evita requisição com input vazio
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:8080/usuario/search`, {
                params: { q: inputSearch }, // Envia o valor digitado como query parameter
            });
            setUsers(response.data.message || []);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        } finally {
            setLoading(false);
        }
    };

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/usuario/usuarios');
            setUsers(response.data.message);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />

            <form className="w-screen h-screen flex items-center justify-center flex-col">



                <h1 className="text-4xl font-semibold mb-8">Buscar Usuários.</h1>

                <div className="w-full max-w-3xl flex gap-3 mb-8">

                <Input
                        placeholder="Digite o nome ou email"
                        value={inputSearch}
                        onChange={(e) => setinputSearch(e.target.value)} // Atualiza o estado
                    />
                    <Button
                        type="button"
                        onClick={handleSearch}
                        disabled={loading}
                        className="font-semibold"
                    >
                        {loading ? "Carregando..." : "Filtrar Usuários"}
                    </Button>

                    </div>

                <div className="w-full max-w-3xl flex justify-center flex-col gap-5">


                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Plano</TableHead>
                                <TableHead>Plano</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-[#344054] font-[600] ">
                            {users.map((user, index) => (
                                <TableRow key={user.id || index}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.plan}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button type="submit" onClick={HandleSubmit}>
                        <Loader />
                        {loading ? "Carregando..." : "Atualizar"}
                    </Button>

                    <span className="text-slate-950 font-[600] text-xs">botão busca usuários no banco de dados.</span>









                </div>
            </form>
        </>


    );

}