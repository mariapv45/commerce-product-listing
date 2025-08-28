import NavBar from '@/components/layout/NavBar';
import ProductGrid from '@/components/product/ProductGrid';
import Footer from '@/components/layout/Footer';

function App() {
  return (
    <div className='bg-background flex min-h-screen flex-col'>
      <NavBar />
      <main className='flex-1'>
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
