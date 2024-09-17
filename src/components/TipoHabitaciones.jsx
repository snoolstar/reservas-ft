import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

export default function TiposHabitacionDemo() {
    const [habitaciones, setHabitaciones] = useState([]);

    useEffect(() => {
        // Simular la obtención de datos de tipos_habitacion
        const tiposHabitacion = [
            { id: 1, nombre: 'Habitación Simple', descripcion: 'Habitación con cama individual', capacidad: 1 },
            { id: 2, nombre: 'Habitación Doble', descripcion: 'Habitación con cama doble', capacidad: 2 },
            { id: 3, nombre: 'Suite', descripcion: 'Suite de lujo con vista al mar', capacidad: 4 },
            // Agregar más datos según sea necesario
        ];
        setHabitaciones(tiposHabitacion);
    }, []);

    const getSeverity = (habitacion) => {
        if (habitacion.capacidad >= 4) return 'success';
        else if (habitacion.capacidad === 2) return 'warning';
        else return 'info';
    };

    const itemTemplate = (habitacion, index) => {
        return (
            <div className="col-12" key={habitacion.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {/* Aquí puedes poner una imagen representativa si es necesario */}
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://via.placeholder.com/150`} alt={habitacion.nombre} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{habitacion.nombre}</div>
                            <p>{habitacion.descripcion}</p>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-users"></i>
                                    <span className="font-semibold">Capacidad: {habitacion.capacidad}</span>
                                </span>
                                <Tag value={`Capacidad: ${habitacion.capacidad}`} severity={getSeverity(habitacion)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button label="Reservar" icon="pi pi-check" className="p-button-rounded"></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((habitacion, index) => {
            return itemTemplate(habitacion, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            <DataView value={habitaciones} itemTemplate={itemTemplate} />
        </div>
    );
}
