import NavBar from '@/components/layout/NavBar';
import ProductGrid from '@/components/product/ProductGrid';
import Footer from '@/components/layout/Footer';

function App() {
  return (
    <div className='bg-background min-h-screen'>
      <NavBar />
      <main>
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
