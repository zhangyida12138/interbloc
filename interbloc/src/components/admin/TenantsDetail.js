import React from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/TenantsDetail.css';
import CustomNavbar from './CustomNavbar';

function TenantsDetail() {
    const { id } = useParams();

    return (
        <div className="tenants-detail">
            <CustomNavbar />
            <main>
                <section id="section1" class="section1">
                    <h2>Detail1</h2>
                    <p>Information1</p>
                </section>
                <section id="section2" class="section2">
                    <h2>Detail2</h2>
                    <p>Information2</p>
                </section>
                <section id="section1" class="section1">
                    <h2>Detail3</h2>
                    <p>Information3</p>
                </section>
                <section id="section2" class="section2">
                    <h2>Detail4</h2>
                    <p>Information4</p>
                </section>
                <section id="section1" class="section1">
                    <h2>Tenant ID: {id}</h2>
                </section>
            </main>
        </div>
    );
}

export default TenantsDetail;
