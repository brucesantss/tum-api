import axios from "axios";
import { useState } from "react";
import { Button } from "../components/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table";

export const UserInfos = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
  
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
      <form className="w-screen h-screen bg-[#09090B] flex items-center justify-center flex-col">
        <Table className="max-w-3xl">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Plano</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-slate-100 font-semibold">
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
          {loading ? "Carregando..." : "Enviar"}
        </Button>
      </form>
    );
  }