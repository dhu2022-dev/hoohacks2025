function Footer() {
    return (
      <footer className="bg-gray-100 py-4 mt-auto">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Photographer’s Studio. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-gray-800">Privacy</a>
            <a href="#" className="hover:text-gray-800">Terms</a>
            <a href="#" className="hover:text-gray-800">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;