export default function NavBar() {
  return (
    <header className='border-border sticky top-0 z-50 w-full border-b bg-stone-950'>
      <div className='container px-2 pt-4 pb-6'>
        <div className='flex items-end'>
          <img
            src='/images/branding/beer-stein.webp'
            alt='Beer Stein'
            className='size-16 sm:size-20 md:size-24 lg:size-28'
          />
          <h1 className='font-logo -ml-2 text-xl text-amber-400 sm:-ml-4 sm:text-2xl md:text-3xl lg:text-4xl'>
            <div className='pl-4'>The</div>
            <div>Enchanted Tavern</div>
          </h1>
        </div>
      </div>
    </header>
  );
}
