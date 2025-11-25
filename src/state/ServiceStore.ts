import { useEffect, useState } from "react";
import axios from "axios";

// 🔗 Troque pelo endpoint do teu backend hospedado no Railway:
const API_URL = "https://catsitterapidb-main.onrender.com";

export interface Service {
    time: string;
    id: number;
    petName: string;
    serviceType: string;
    date: string;
    notes?: string;
    userId: number;
    adminId: number; // 👈 Necessário para a filtragem
    user?: {
        name: string;
        email: string;
    };
    price: number;
}

// 🛑 CORREÇÃO: O hook agora recebe o adminId, mas usaremos ele para filtrar localmente.
export function useServicesData(adminId?: number) {
    const [allServices, setAllServices] = useState<Service[]>([]); // Armazena a lista bruta
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllServices = async () => {
            setLoading(true);
            try {
                // 🛑 1. BUSCA SEM FILTRO NA URL: Busca todos os serviços (assumindo que a API não filtra)
                const res = await axios.get(`${API_URL}/services`);
                setAllServices(res.data);
            } catch (err) {
                console.error("Erro ao buscar TODOS os serviços:", err);
                setAllServices([]);
            } finally {
                setLoading(false);
            }
        };
        // Buscamos os dados uma única vez, independentemente do adminId, pois a API não filtra
        fetchAllServices();
    }, []); 

    // 🛑 2. FILTRAGEM LOCAL: Filtra a lista completa de serviços pelo ID do administrador logado
    const services = allServices.filter(service => 
        // Apenas inclui o serviço se o adminId do serviço for igual ao ID do admin logado
        service.adminId === adminId
    );

    // 3. Calcula dados estatísticos APENAS com os serviços filtrados
    const totalRevenue = services.reduce((acc, s) => acc + (s.price || 0), 0);
    
    // Mapeamos os IDs dos clientes ÚNICOS apenas dos serviços filtrados
    const uniqueClients = new Set(services.map((s) => s.userId)).size;
    
    const currentMonth = new Date().getMonth();
    const servicesThisMonth = services.filter(
        (s) => new Date(s.date).getMonth() === currentMonth
    ).length;

    const recentServices = [...services]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    return {
        loading,
        totalRevenue,
        activeClients: uniqueClients,
        servicesThisMonth,
        recentServices,
    };
}