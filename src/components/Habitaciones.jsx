import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

export default function HabitacionesDataView() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        // Aquí deberías cargar las habitaciones desde tu API
        // Por ahora, usaremos datos de ejemplo
        const habitacionesEjemplo = [
            { id: 1, numero_habitacion: 101, precio: 100.00, id_tipo_habitacio: 'simple', rating: 4, disponibilidad: 'DISPONIBLE' },
            { id: 2, numero_habitacion: 102, precio: 150.00, id_tipo_habitacio: 'doble', rating: 5, disponibilidad: 'OCUPADA' },
            { id: 3, numero_habitacion: 103, precio: 200.00, id_tipo_habitacio: 'suite', rating: 5, disponibilidad: 'DISPONIBLE' },
        ];
        setHabitaciones(habitacionesEjemplo);
    }, []);

    const getSeverity = (habitacion) => {
        switch (habitacion.disponibilidad) {
            case 'DISPONIBLE':
                return 'success';
            case 'OCUPADA':
                return 'danger';
            default:
                return null;
        }
    };

    const listItem = (habitacion, index) => {
        return (
            <div className="col-12" key={habitacion.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`/api/placeholder/400/320`} alt={`Habitación ${habitacion.numero_habitacion}`} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">Habitación {habitacion.numero_habitacion}</div>
                            <Rating value={habitacion.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{habitacion.id_tipo_habitacio}</span>
                                </span>
                                <Tag value={habitacion.disponibilidad} severity={getSeverity(habitacion)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${habitacion.precio}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={habitacion.disponibilidad === 'OCUPADA'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (habitacion) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={habitacion.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{habitacion.id_tipo_habitacio}</span>
                        </div>
                        <Tag value={habitacion.disponibilidad} severity={getSeverity(habitacion)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`/api/placeholder/400/320`} alt={`Habitación ${habitacion.numero_habitacion}`} />
                        <div className="text-2xl font-bold">Habitación {habitacion.numero_habitacion}</div>
                        <Rating value={habitacion.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${habitacion.precio}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={habitacion.disponibilidad === 'OCUPADA'}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (habitacion, layout, index) => {
        if (!habitacion) {
            return;
        }

        if (layout === 'list') return listItem(habitacion, index);
        else if (layout === 'grid') return gridItem(habitacion);
    };

    const listTemplate = (habitaciones, layout) => {
        return <div className="grid grid-nogutter">{habitaciones.map((habitacion, index) => itemTemplate(habitacion, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={habitaciones} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}