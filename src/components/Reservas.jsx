import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';

export default function ReservasPickList() {
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);

    useEffect(() => {
        // Simular la obtención de datos de reservas desde una API o servicio.
        const reservas = [
            { id: 1, fecha_inicio: '2024-09-15', fecha_fin: '2024-09-20', id_usuario: 1, id_habitacion: 101 },
            { id: 2, fecha_inicio: '2024-09-16', fecha_fin: '2024-09-22', id_usuario: 2, id_habitacion: 102 }
            // Otros datos de reserva...
        ];
        setSource(reservas);
    }, []);

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    };

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">Reserva ID: {item.id}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-calendar text-sm"></i>
                        <span>Desde: {item.fecha_inicio} Hasta: {item.fecha_fin}</span>
                    </div>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-user text-sm"></i>
                        <span>ID Usuario: {item.id_usuario}</span>
                    </div>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-home text-sm"></i>
                        <span>ID Habitación: {item.id_habitacion}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <PickList dataKey="id" source={source} target={target} onChange={onChange} itemTemplate={itemTemplate} breakpoint="1280px"
                sourceHeader="Reservas Disponibles" targetHeader="Reservas Seleccionadas" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }} />
        </div>
    );
}