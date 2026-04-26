import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div style={{ padding: "16px", maxWidth: "900px", margin: "auto" }}>
        <h1 style={{ textAlign: "center" }}>
          Loveline Data Solutions
        </h1>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Pata Data, SMS or Minutes hata ukiwa na Okoa Jahazi 🥳 <br />
          (Speed nayo ni umeme ⚡)
        </p>

        {/* DATA OFFERS */}
        <h2>📶 BINGWA DATA OFFERS</h2>
        <ul>
          <li>Ksh 55 = 1.25GB (midnight)</li>
          <li>Ksh 19 = 1GB (1 hour)</li>
          <li>Ksh 20 = 250MB (24hrs)</li>
          <li>Ksh 50 = 1.5GB (3 hours)</li>
          <li>Ksh 99 = 1GB (24hrs)</li>
          <li>Ksh 49 = 350MB (7 days)</li>
          <li>Ksh 300 = 2.5GB (7 days)</li>
          <li>Ksh 700 = 6GB (7 days)</li>
        </ul>

        {/* BUY MANY */}
        <h3>💊 Buy Many Times Data</h3>
        <ul>
          <li>Ksh 22 = 1GB (1 hour)</li>
          <li>Ksh 52 = 1.5GB (3 hours)</li>
          <li>Ksh 110 = 2GB (24hrs)</li>
        </ul>

        {/* SMS */}
        <h2>💬 SMS OFFERS</h2>
        <ul>
          <li>Ksh 5 = 20 SMS (24hrs)</li>
          <li>Ksh 10 = 200 SMS (24hrs)</li>
          <li>Ksh 30 = 1000 SMS (7 days)</li>
        </ul>

        {/* MINUTES */}
        <h2>📞 MINUTES OFFERS</h2>
        <ul>
          <li>Ksh 23 = 45 mins (3 hrs)</li>
          <li>Ksh 51 = 50 mins (till midnight)</li>
          <li>Ksh 210 = 250 mins (7 days)</li>
        </ul>

        {/* MONTHLY */}
        <h2>📅 MONTHLY OFFERS</h2>
        <ul>
          <li>Ksh 499 = 2.5GB (30 days)</li>
          <li>Ksh 1000 = 10GB (30 days)</li>
          <li>Ksh 500 = 300 mins (30 days)</li>
          <li>Ksh 999 = 1250 mins (30 days)</li>
          <li>Ksh 1001 = 8GB + 400 mins (30 days)</li>
        </ul>

        {/* HOW TO BUY */}
        <h2>🛒 HOW TO PURCHASE</h2>
        <ol>
          <li>Go to M-Pesa</li>
          <li>Lipa na M-Pesa</li>
          <li>Buy Goods and Services</li>
          <li>
            Enter Till Number: <strong>3663500 (Loveline)</strong>
          </li>
          <li>Pay exact amount</li>
        </ol>

        <p style={{ marginTop: "10px", color: "red" }}>
          NOTE: Bingwa packages = 1 per day per number. <br />
          Others (data, sms, minutes) can be bought multiple times.
        </p>

        {/* LINK */}
        <h3>🌐 Buy for another number</h3>
        <a href="https://bingwahybrid.com/loveline" target="_blank" rel="noreferrer">
          https://bingwahybrid.com/loveline
        </a>

        {/* CONTACT */}
        <h3 style={{ marginTop: "20px" }}>📞 Contact</h3>
        <p>0792590399 (WhatsApp or Call)</p>

        <h2 style={{ textAlign: "center", marginTop: "30px" }}>
          🔥 Loveline Data Solutions
        </h2>
      </div>
    </MainLayout>
  );
};

export default Home;