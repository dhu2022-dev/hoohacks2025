import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
      <footer className="bg-slate-600 py-4 mt-auto">
        <div className="container mx-auto text-center text-white">
          <p>&copy; {new Date().getFullYear()} Shuttersense. All rights reserved.</p>
        </div>
        <p className="text-center text-sm text-gray-300 mt-2">
          Contact erg3kp@virginia.edu for any questions or inquiries. 
        </p>
      </footer>
    );
  }
  
  export default Footer;