import React from 'react';


const AboutUsPage = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <section style={{ display: 'flex', alignItems: 'center', marginBottom: '50px', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <div >
                    <div style={{ flex: '1', marginRight: '50px' }}>
                    <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#333'}}>About Us</h1>
                    <p style={{ marginBottom: '15px', color: '#666' }}>Welcome to <span style={{ fontWeight: 'bold', color: '#222' }}>Coffee with us</span>, your cozy sanctuary in the heart of the city.</p>
                    <p style={{ marginBottom: '15px', color: '#666' }}>Since <span style={{ fontWeight: 'bold', color: '#222' }}>2024</span>, we've been dedicated to serving the finest quality coffee, handcrafted with love and expertise.</p>
                    <p style={{ marginBottom: '15px', color: '#666' }}>At <span style={{ fontWeight: 'bold', color: '#222' }}>Coffee with us</span>, every cup tells a story. From the rich aroma of our signature blends to the comforting warmth of our cozy ambiance, we strive to create memorable experiences for our customers.</p>
                    </div>
                    <p style={{ marginBottom: '30px', color: '#666' }}>Whether you're a coffee aficionado, a tea enthusiast, or simply seeking a place to unwind, we invite you to join us on a journey of flavor and discovery.</p>
                    <div style={{ flex: '1' }}>
                    <img src="../../assets/img/about.png" alt="Cafe Image" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </div>
                    <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>Our History</h2>
                    <p style={{ marginBottom: '30px', color: '#666' }}>Coffee with us was founded by <span style={{ fontWeight: 'bold', color: '#222' }}>Janavi patel</span> with a passion for bringing people together over a cup of coffee. From our humble beginnings as a small coffee cart to becoming a beloved community hub, our commitment to quality and hospitality remains unchanged.</p>
                    <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>Our Specialties</h2>
                    <p style={{ marginBottom: '30px', color: '#666' }}>Indulge in our specialty coffee drinks, delicious pastries, and savory snacks. Try our signature espresso blend or explore our seasonal offerings curated by our expert baristas.</p>
                    <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>Our Services</h2>
                    <ul style={{ marginBottom: '30px' }}>
                        <li style={{ marginBottom: '10px', color: '#666' }}>Table service</li>
                        <li style={{ marginBottom: '10px', color: '#666' }}>Takeout and delivery</li>
                        <li style={{ marginBottom: '10px', color: '#666' }}>Private events and catering</li>
                        <li style={{ marginBottom: '10px', color: '#666' }}>Barista workshops and tastings</li>
                    </ul>
                </div>
               
            </section>
        </div>
    );
}

export default AboutUsPage;