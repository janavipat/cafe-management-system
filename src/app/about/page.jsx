import React from 'react'

// components/AboutUsPage.js

const AboutUsPage = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <section style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>About Us</h1>
                <p>Welcome to [Your Cafe Name], where passion meets perfection in every cup.</p>
            </section>
            <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Our Story</h2>
                    <p>Founded in [Year], [Your Cafe Name] has been serving the finest coffee and tea blends, along with a warm and inviting atmosphere for coffee lovers and enthusiasts alike.</p>
                    <p>Our mission is to create memorable experiences through exceptional coffee, delicious pastries, and a welcoming environment that feels like home.</p>
                </div>
                <div style={{ flex: '1' }}>
                    <img src="/cafe-categories.jpg" alt="Cafe Categories" style={{ width: '100%', height: 'auto' }} />
                </div>
            </section>
            <footer style={{ textAlign: 'center', marginTop: '50px', padding: '20px 0', backgroundColor: '#f2f2f2' }}>
                <p>&copy; {new Date().getFullYear()} [Your Cafe Name]. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AboutUsPage;
